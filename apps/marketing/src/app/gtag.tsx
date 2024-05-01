import Script from 'next/script'

export default function GTag() {
  return (
    <>
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-4FS9J86MY2' />
      <Script id='google-analytics'>
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
  
           gtag('config', 'G-4FS9J86MY2');
         `}
      </Script>
    </>
  )
}
