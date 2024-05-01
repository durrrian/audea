import {
  Accordion as AccordionComponent,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@repo/web-ui/components'

const data = [
  {
    question: <span>Bagaimana cara menjadi member Supercuan Saham?</span>,
    answer: (
      <>
        Kamu bisa langsung klik tombol “Gabung membership” di website Supercuan Saham dan ikuti proses pendaftarannya
        yang sangat simpel. Setelah melakukan pembayaran, kamu akan menerima email konfirmasi pendaftaran dan akan
        mendapat link untuk join channel Telegram.
      </>
    ),
  },

  {
    question: <span>Apa saja yang saya dapat ketika menjadi member Supercuan Saham?</span>,
    answer: (
      <>
        Kamu akan mendapat akses melihat portfolio saham Supercuan Saham yang selalu di update melalui email dan grup
        Telegram, analisis dari emiten terpilih, dan <em>online course</em>.
      </>
    ),
  },

  {
    question: (
      <span>
        Apakah Supercuan Saham mempunyai <em>free trial</em>?
      </span>
    ),
    answer: (
      <>
        Supercuan Saham <strong>tidak</strong> menyediakan <em>free trial</em>. Performa nyata Supercuan Saham bisa
        dilihat di Instagram Supercuan Saham. Jika kamu masih ragu untuk menjadi member, kamu bisa melihat testimoni
        dari member yang senang menjadi bagian dari Supercuan Saham.
      </>
    ),
  },

  {
    question: <span>Metode pembayaran apa yang digunakan untuk menjadi member Supercuan Saham?</span>,
    answer: (
      <>
        Pembayaran untuk menjadi membership bisa dilakukan melalui e-wallet (QRIS, GoPay, Shopee Pay) & bank transfer
        (BCA, Mandiri, BNI, Bank Permata & CIMB Niaga).
      </>
    ),
  },

  {
    question: (
      <span>
        Apakah saya bisa meng-<em>upgrade</em> paket membership saya?
      </span>
    ),
    answer: (
      <>
        Kamu{' '}
        <strong>
          bisa <em>upgrade</em>
        </strong>{' '}
        membership kamu. Membership end-date baru akan ditambahkan dari membership end date yang lama. Ini akan membuat
        member <em>exempt</em> dari kenaikan harga membership Supercuan kedepannya.
      </>
    ),
  },

  {
    question: <span>Apa jalur komunikasi Supercuan Saham ke para member?</span>,
    answer: (
      <>
        Melalui channel Telegram, Email, dan website. Bagi kamu yang belum mempunyai punya Telegram, kami sarankan untuk
        mengunduh aplikasinya terlebih dahulu.
      </>
    ),
  },
]

export function Accordion() {
  return (
    <AccordionComponent type='single' collapsible className='w-full space-y-14'>
      {data.map((v, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key -- no string value
          <AccordionItem value={`item-${i}`} key={i}>
            <AccordionTrigger className='text-xl'>{v.question}</AccordionTrigger>
            <AccordionContent className='text-lg'>{v.answer}</AccordionContent>
          </AccordionItem>
        )
      })}
    </AccordionComponent>
  )
}
