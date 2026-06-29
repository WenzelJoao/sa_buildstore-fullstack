export default {
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./reports",
        filename: "report.html",
        expand: true,
        pageTitle: "Relatório de Testes"
      }
    ]
  ]
};