// @ts-ignore
const modules = import.meta.glob("./language/**/*.{ts,js}", {
  import: "default",
  eager: true,
});

interface LanguageModules {
  [key: string]: any;
}

function getLanguages(langs: LanguageModules, prefix = "language") {
  let result: Record<string, any> = {};

  Object.entries(langs).forEach(([key]) => {
    const mod = langs[key];

    let k = key.replace(`./${prefix}/`, "").replace(/^\.\//, "");

    const lastIndex = k.lastIndexOf(".");

    k = k.substring(0, lastIndex);

    const keyList = k.split("/");

    const lang = keyList.shift();

    const objKey = keyList.join(".");

    if (lang) {
      result[lang] = result[lang] || {};
      result[lang][objKey] = mod;
    }
  });
  return result;
}

const language = getLanguages(modules);

export default language;
