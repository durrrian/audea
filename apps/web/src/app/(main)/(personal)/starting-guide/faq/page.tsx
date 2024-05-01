import Link from 'next/link'
import { Separator } from '@repo/web-ui/components'
import { ChatWithUs } from '../chat-with-us'

export default function Page() {
  const faqList = [
    {
      q: 'Apa harus beli di hari/jam itu juga?',
      a: (
        <p>
          Tidak harus karena approach kita value investing, pandangan long-term, fluktuasi harga harian tidak penting,
          beli besoknya juga boleh.
        </p>
      ),
    },

    {
      q: 'Sahamnya terlalu banyak apa harus dibeli/diikutin semua?',
      a: (
        <p>
          Tidak harus. Tapi disarankan untuk mengikuti terutama yang weightagenya besar.{' '}
          <strong className='font-medium'>Weightage besar = semakin yakin</strong>.
        </p>
      ),
    },

    {
      q: 'Average saya jauh di atas kalau saya beli saham yang direkomen & belum punya. Gimana?',
      a: (
        <p>
          Tidak apa-apa. <strong className='font-medium'>Approach value investing</strong>. Kalau udah jelek ga potensi
          ntar juga dikeluarin dari porto. Saham yang udah naik banyak bukan berarti ga akan bisa naik lagi.
        </p>
      ),
    },

    {
      q: 'Apakah saya direkomendasi / boleh punya saham di luar porto',
      a: (
        <p>
          Boleh. Tapi baiknya di porto saham yang berbeda kalau mau performanya keliatan/ke sync, kalau tidak ya
          gabungin saja tak masalah. Kalau mau daftar buat akun sekuritas baru saya rekomen mirae asset. Kamu bisa
          daftar mirae asset melalui{' '}
          <Link href='https://forms.gle/JGmPsTKwhtYt4H2K7?fbclid=PAAaYwgIaXgluEAzNXCxCnLd0Rs91H_YpspfGruMzosqzlNeiFYeZu8T7Vkok'>
            link ini
          </Link>
          .
        </p>
      ),
    },

    {
      q: 'Berapa modal yang disarankan?',
      a: (
        <p>
          Terserah tapi bisa dilihat di setiap screenshot modal saya 400+jt. Semampunya kalian saja. Tp ingat nominal
          keuntungan akan bergantung pada modal juga.
        </p>
      ),
    },
  ]
  return (
    <section className='w-full h-fit space-y-8 text-justify'>
      <h1 className='md:text-4xl text-2xl font-semibold mb-10 text-left'>FAQ</h1>

      <p className='font-medium text-left'>Pertanyaan seputar Supercuan Saham.</p>

      <ol className='list-inside list-decimal space-y-8'>
        {faqList.map((v, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key -- no string value
            <div key={i} className='space-y-2'>
              <li className='font-semibold text-base text-left'>{v.q}</li>
              {v.a}
              <Separator />
            </div>
          )
        })}
      </ol>

      <p>
        Jika ada pertanyaan atau kendala, silahkan gunakan fitur <ChatWithUs />
      </p>

      <p>
        <em>Have a great investment journey!</em>
        <br />
        Alvin
      </p>
    </section>
  )
}
