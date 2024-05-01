import { Separator } from '@repo/web-ui/components'
import { ChatWithUs } from '../chat-with-us'

export default function Page() {
  const recommendationList = [
    {
      q: 'Copy sepenuhnya atau top 10/20 agar performa sync',
      a: (
        <>
          <p>
            Karena misal anda beli ZZXX di 10000 tapi average saya 6000, terus turun ke 9000 terus aku jual, rugi 10%
            misal, berarti bulan ini porto saya turun juga kan. Tapi bulan depan kan bisa naik lagi juga.
          </p>

          <p>
            Kalau misal saham XXYY anda ga beli di 5000 karena average saya di 3000 kalau naik lagi ke 7000 berarti
            kalian itungannya rugi kan ga beli. Jadi yg penting performanya kesync, kalau pilih2 sendiri dan alokasinya
            gimana ya bisa juga, boleh banget tapi saya cuman bertanggung jawab atas performa saya kalau begitu.
            Kira-kira begitu ya temen-temen, semoga membantu supaya bisa meng copy lebih baik.
          </p>
        </>
      ),
    },

    {
      q: 'Subscribe jangka panjang',
      a: (
        <p>
          Berhubungan dengan point pertama, portfolio akan semakin sync semakin lama anda menigkuti porto saya
          dikarenakan tanggal cum date dividend & lain-lain. Average mungkin juga akan semakin mirip jika ada penambahan
          saham baru & lain-lain. Disarankan subscribe jangka panjang.
        </p>
      ),
    },

    {
      q: 'Tidak overtrading',
      a: (
        <p>
          Semakin dikit transaksi, semakin bagus. Itu lah di supercuan, mungkin terkadang cuman ada perubahan porto 1x
          dalam seminggu. Dikarenakan kunci sukses dari pasar saham adalah pertama tahu apa yang kita beli & kedua{' '}
          <strong>bersabar</strong>. Kalau kebanyakan transaksi - fee kita kasih ke broker lebih besar - mereka yang
          kaya.
        </p>
      ),
    },

    {
      q: 'Alasan tidak kasih target price',
      a: (
        <p>
          Balik ini lagi karena alasn di atas lah kenapa saya tidak kasih target price seperti sekuritas pada umumnya -
          take profit di harga xx. Karena pertama beli bisnis itu tidak ada kita targetkan di jual berapa - pikir ibarat
          kalian punya toko yang bagus cuan terus laba 1 milyar setahun & keep growing - dan bisa sekolahin anak kalian
          ke amerika dari situ - apakah iya kita bakal mikir saya jual toko saya di 10 milyar ke orang lain lah - ngga
          akan kan. Itu hanya akalan broker supaya customer nya tertarik untuk trading lebih sering. Kalau semua orang
          punya mindset value investor - sekuritas pada rugi semua.
        </p>
      ),
    },
  ]

  return (
    <section className='w-full h-fit space-y-8 text-justify'>
      <h1 className='md:text-4xl text-2xl font-semibold mb-10 text-left'>Rekomendasi Saya</h1>

      <ol className='list-inside list-decimal space-y-8'>
        {recommendationList.map((v, i) => {
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
