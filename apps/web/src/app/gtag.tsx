import Script from 'next/script'

export default function GTag() {
  return (
    <>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-KJ7DPMCGE1' />
      <Script id='google-analytics'>
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
  
           gtag('config', 'G-KJ7DPMCGE1');
         `}
      </Script>
    </>
  )
}
