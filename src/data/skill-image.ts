const adobeXd = "/svg/skills/adobe-xd.svg";
const adobeaudition = "/svg/skills/adobeaudition.svg";
const afterEffects = "/svg/skills/after-effects.svg";
const angular = "/svg/skills/angular.svg";
const aws = "/svg/skills/aws.svg";
const azure = "/svg/skills/azure.svg";
const blender = "/svg/skills/blender.svg";
const bootstrap = "/svg/skills/bootstrap.svg";
const bulma = "/svg/skills/bulma.svg";
const c = "/svg/skills/c.svg";
const canva = "/svg/skills/canva.svg";
const capacitorjs = "/svg/skills/capacitorjs.svg";
const coffeescript = "/svg/skills/coffeescript.svg";
const cplusplus = "/svg/skills/cplusplus.svg";
const csharp = "/svg/skills/csharp.svg";
const css = "/svg/skills/css.svg";
const dart = "/svg/skills/dart.svg";
const deno = "/svg/skills/deno.svg";
const django = "/svg/skills/django.svg";
const docker = "/svg/skills/docker.svg";
const fastify = "/svg/skills/fastify.svg";
const figma = "/svg/skills/figma.svg";
const firebase = "/svg/skills/firebase.svg";
const flutter = "/svg/skills/flutter.svg";
const gimp = "/svg/skills/gimp.svg";
const git = "/svg/skills/git.svg";
const go = "/svg/skills/go.svg";
const graphql = "/svg/skills/graphql.svg";
const haxe = "/svg/skills/haxe.svg";
const html = "/svg/skills/html.svg";
const illustrator = "/svg/skills/illustrator.svg";
const ionic = "/svg/skills/ionic.svg";
const java = "/svg/skills/java.svg";
const javascript = "/svg/skills/javascript.svg";
const julia = "/svg/skills/julia.svg";
const kotlin = "/svg/skills/kotlin.svg";
const lightroom = "/svg/skills/lightroom.svg";
const markdown = "/svg/skills/markdown.svg";
const materialui = "/svg/skills/materialui.svg";
const matlab = "/svg/skills/matlab.svg";
const memsql = "/svg/skills/memsql.svg";
const microsoftoffice = "/svg/skills/microsoftoffice.svg";
const mongoDB = "/svg/skills/mongoDB.svg";
const mysql = "/svg/skills/mysql.svg";
const nodejs = "/svg/skills/nodejs.svg";
const nextJS = "/svg/skills/nextJS.svg";
const nginx = "/svg/skills/nginx.svg";
const numpy = "/svg/skills/numpy.svg";
const nuxtJS = "/svg/skills/nuxtJS.svg";
const opencv = "/svg/skills/opencv.svg";
const photoshop = "/svg/skills/photoshop.svg";
const php = "/svg/skills/php.svg";
const picsart = "/svg/skills/picsart.svg";
const postgresql = "/svg/skills/postgresql.svg";
const premierepro = "/svg/skills/premierepro.svg";
const python = "/svg/skills/python.svg";
const pytorch = "/svg/skills/pytorch.svg";
const react = "/svg/skills/react.svg";
const ruby = "/svg/skills/ruby.svg";
const rlang = "/svg/skills/rlang.svg";
const selenium = "/svg/skills/selenium.svg";
const sketch = "/svg/skills/sketch.svg";
const strapi = "/svg/skills/strapi.svg";
const svelte = "/svg/skills/svelte.svg";
const swift = "/svg/skills/swift.svg";
const tailwind = "/svg/skills/tailwind.svg";
const tensorflow = "/svg/skills/tensorflow.svg";
const typescript = "/svg/skills/typescript.svg";
const unity = "/svg/skills/unity.svg";
const vitejs = "/svg/skills/vitejs.svg";
const vue = "/svg/skills/vue.svg";
const vuetifyjs = "/svg/skills/vuetifyjs.svg";
const webix = "/svg/skills/webix.svg";
const wolframalpha = "/svg/skills/wolframalpha.svg";
const wordpress = "/svg/skills/wordpress.svg";

export const skillsImage = (skill: string) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case "html":
      return html;
    case "photoshop":
      return photoshop;
    case "docker":
      return docker;
    case "illustrator":
      return illustrator;
    case "adobe xd":
      return adobeXd;
    case "after effects":
      return afterEffects;
    case "css":
      return css;
    case "angular":
      return angular;
    case "javascript":
      return javascript;
    case "next js":
      return nextJS;
    case "nuxt js":
      return nuxtJS;
    case "react":
      return react;
    case "rlang":
      return rlang;
    case "svelte":
      return svelte;
    case "typescript":
      return typescript;
    case "vue":
      return vue;
    case "bootstrap":
      return bootstrap;
    case "bulma":
      return bulma;
    case "capacitorjs":
      return capacitorjs;
    case "coffeescript":
      return coffeescript;
    case "memsql":
      return memsql;
    case "mongodb":
      return mongoDB;
    case "mysql":
      return mysql;
    case "postgresql":
      return postgresql;
    case "tailwind":
      return tailwind;
    case "vitejs":
      return vitejs;
    case "vuetifyjs":
      return vuetifyjs;
    case "c":
      return c;
    case "c++":
      return cplusplus;
    case "c#":
      return csharp;
    case "dart":
      return dart;
    case "go":
      return go;
    case "java":
      return java;
    case "kotlin":
      return kotlin;
    case "julia":
      return julia;
    case "matlab":
      return matlab;
    case "php":
      return php;
    case "python":
      return python;
    case "ruby":
      return ruby;
    case "swift":
      return swift;
    case "adobe audition":
      return adobeaudition;
    case "aws":
      return aws;
    case "deno":
      return deno;
    case "django":
      return django;
    case "firebase":
      return firebase;
    case "gimp":
      return gimp;
    case "git":
      return git;
    case "graphql":
      return graphql;
    case "lightroom":
      return lightroom;
    case "materialui":
      return materialui;
    case "nginx":
      return nginx;
    case "numpy":
      return numpy;
    case "opencv":
      return opencv;
    case "premiere pro":
      return premierepro;
    case "pytorch":
      return pytorch;
    case "selenium":
      return selenium;
    case "strapi":
      return strapi;
    case "tensorflow":
      return tensorflow;
    case "webix":
      return webix;
    case "wordpress":
      return wordpress;
    case "azure":
      return azure;
    case "blender":
      return blender;
    case "fastify":
      return fastify;
    case "figma":
      return figma;
    case "flutter":
      return flutter;
    case "haxe":
      return haxe;
    case "ionic":
      return ionic;
    case "markdown":
      return markdown;
    case "microsoft office":
      return microsoftoffice;
    case "picsart":
      return picsart;
    case "nodejs":
      return nodejs;
    case "sketch":
      return sketch;
    case "unity":
      return unity;
    case "wolframalpha":
      return wolframalpha;
    case "canva":
      return canva;
    default:
      break;
  }
};
