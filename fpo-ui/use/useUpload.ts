import COS, { CosSdkError, ProgressInfo, UploadFileItemParams, UploadFileItemResult, UploadFileResult } from "cos-js-sdk-v5";
import { useCosStore } from "@/store/useCos";
import { ref } from "vue";
import { randomString } from "@/utils/helper";

export const useUpload = () => {
  const cos = ref(null);
  const domain = {
    default: "https://moya-1251999712.cos.ap-guangzhou.myqcloud.com",
    cdn: "https://cos.moya.plus",
  };

  /**
   * 生成文件 key
   * @param path
   * @param fileName
   * @returns
   */
  const generateFileKey = (path: string, fileName: string): string => {
    // @ts-ignore
    const VITE_ENV_NAME = import.meta.env.VITE_ENV_NAME as string;
    const env = VITE_ENV_NAME === "prod" ? "" : `/${VITE_ENV_NAME}`;

    const sanitizedFileName = fileName.replace(/\s+/g, "");
    return `${env}${path}/${randomString(6)}-${sanitizedFileName}`;
  };

  /**
   * 初始化 Cos 方法
   * @param FileParallelLimit 同一个实例下上传的文件并发数
   * @param ChunkParallelLimit 同一个上传文件的分块并发数
   * @param ProgressInterval 上传进度的回调方法 onProgress 的回调频率，单位 ms
   * @returns Object { ...cos }
   */
  function initCos(FileParallelLimit: number = 10, ChunkParallelLimit: number = 10, ProgressInterval: number = 100) {
    cos.value = new COS({
      getAuthorization: async function (_options: any, callback: any) {
        await useCosStore().initCredentials();
        const { credentials, startTime: StartTime, expiredTime: ExpiredTime } = useCosStore();
        const { tmpSecretId: TmpSecretId, tmpSecretKey: TmpSecretKey, sessionToken: SecurityToken } = credentials;

        callback({ TmpSecretId, TmpSecretKey, SecurityToken, StartTime, ExpiredTime });
      },
      FileParallelLimit,
      ChunkParallelLimit,
      ProgressInterval,
    });

    return cos.value;
  }

  function limitSize(size: number, fileSize: number) {
    // const checkType = limit.type && limitFileType(file.name, limit.type);
    // if (!checkType) return { isSuccess: false, msg: "文件类型不正确" }

    if (size && size < fileSize) {
      throw new Error(`文件体积超出限制`);
    }
  }

  /**
   * 上传文件
   * @param file 文件
   * @param key 路径-文件名
   * @param onProgress 进度触发
   * @param onFileFinish 完成触发
   * @param onComplete 结束触发
   */
  const uploadFile = async (
    file: File | Blob,
    key: string,
    onProgress?: (params: ProgressInfo) => any,
    onFileFinish?: (err: Error, data: UploadFileItemResult, options: UploadFileItemParams) => void,
    onComplete?: (err: CosSdkError, data: UploadFileResult) => void
  ) => {
    try {
      const { bucket: Bucket, region: Region } = useCosStore();
      !cos.value && initCos();

      const data = await cos.value.uploadFile(
        {
          Bucket,
          Region,
          Body: file,
          Key: key,
          onProgress,
          onFileFinish,
        },
        onComplete
      );

      return { err: null, data };
    } catch (err) {
      return { err, data: null };
    }
  };

  /**
   * 批量上传
   * @param files
   * @param onProgress 进度触发
   * @param onFileFinish 完成触发
   * @param onComplete 结束触发
   * @returns
   */
  const batchUpload = async (
    rawFiles: { file: File | Blob; key: string }[],
    onProgress?: (params: ProgressInfo) => any,
    onFileFinish?: (err: Error, data: UploadFileItemResult, options: UploadFileItemParams) => void,
    onComplete?: (err: CosSdkError, data: UploadFileResult) => void
  ) => {
    try {
      const { bucket: Bucket, region: Region } = useCosStore();
      !cos.value && initCos();

      let files = [];
      for (let i = 0; i < rawFiles.length; i++) {
        const element = rawFiles[i];
        files.push({ Bucket, Region, Key: element.key, Body: element.file });
      }

      const data = await cos.value.uploadFiles(
        {
          files,
          SliceSize: 1024 * 1024 * 10 /* 设置大于10MB采用分块上传 */,
          onProgress,
          onFileFinish,
        },
        onComplete
      );

      return { err: null, data };
    } catch (err) {
      return { err, data: null };
    }
  };

  /**
   * 将 Blob 转换为 base64
   * @param blob 文件 Blob
   * @returns Promise<string>
   */
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  /**
   * 将 base64 转换为 Blob
   * @param base64 base64 字符串
   * @param contentType 内容类型
   * @returns Blob
   */
  const base64ToBlob = (base64: string, contentType: string = ""): Blob => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      // eslint-disable-next-line no-new-array
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  return {
    domain,
    initCos,
    uploadFile,
    limitSize,
    batchUpload,
    generateFileKey,
    blobToBase64,
    base64ToBlob,
  };
};
