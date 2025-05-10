import { ref } from "vue";

export function useRef<T extends abstract new (...args: any) => any>(_comp: T) {
  return ref<InstanceType<T>>();
}
