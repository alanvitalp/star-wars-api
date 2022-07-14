import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&family=Saira+Extra+Condensed:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          async
          src="https://cse.google.com/cse.js?cx=526d90fb1a9e34940"
        ></script>
      </body>
    </Html>
  )
}
