import { Terminal } from 'lucide-react'
import Image1 from '@repo/assets/web/navigating-the-app/image_1.png'
import Image2 from '@repo/assets/web/navigating-the-app/image_2.png'
import Image3 from '@repo/assets/web/navigating-the-app/image_3.png'
import Image4 from '@repo/assets/web/navigating-the-app/image_4.png'
import Image from 'next/image'
import { Alert, AlertTitle, AlertDescription } from '@repo/web-ui/components'
import { ChatWithUs } from '../chat-with-us'

export default function Page() {
  return (
    <section className='w-full h-fit space-y-8 text-justify'>
      <h1 className='md:text-4xl text-2xl font-semibold mb-10 text-left'>Navigating the App</h1>

      <p className='font-medium text-left'>
        Untuk mendapatkan keuntungan maksimal dari dashboard Supercuan Saham, ada 3 halaman perlu anda pahami:
      </p>

      <section className='mt-4 space-y-4'>
        <h3 className='text-left md:text-3xl text-xl font-medium'>Halaman Portofolio</h3>

        <p>
          Halaman ini berisi tabel real-time portofolio saya yang dibagikan khusus untuk para member Supercuan Saham
          saja.
        </p>

        <section className='space-y-8'>
          <p>Ada 3 bagian yang bisa kamu lihat di halaman ini:</p>

          <section className='space-y-6'>
            <section className='space-y-2 text-left'>
              <p className='md:text-2xl text-lg font-medium'>1. Daftar portofolio</p>

              <p>Di laman ini, anda akan melihat 2 tabel. </p>
            </section>

            <section className='space-y-4'>
              <p>
                Tabel pertama bernama Portofolio. Tabel ini diisi dengan seluruh emiten yang menjadi tujuan investasi
                saya.
              </p>

              <Image src={Image1} alt='' quality={100} draggable={false} />

              <section className='space-y-2'>
                <p>Beberapa hal yang perlu kamu tau ketika membaca tabel ini:</p>

                <ul className='list-disc list-outside ml-6 space-y-2'>
                  <li>
                    <strong>Avg Price</strong> — Harga pembelian rata-rata dari emiten tersebut. Kenapa rata-rata?
                    Karena saya bisa membeli emiten tersebut di waktu dan harga yang berbeda
                  </li>
                  <li>
                    <strong>Last Price</strong> — Harga 1 lot dari emiten terkait yang akan otomatis terganti saat pasar
                    saham tutup yakni jam 16.00 di hari sebelumnya
                  </li>
                  <li>
                    <strong>Lot</strong> — Jumlah lot yang saya punya untuk emiten tersebut
                  </li>
                  <li>
                    <strong>Value</strong> — Jumlah nominal yang saya investasikan untuk emiten tersebut
                  </li>
                  <li>
                    <strong>Ptsl (+/-)</strong> — Floating profit / loss
                  </li>
                  <li>
                    <strong>Ptsl (+/-) %</strong> — Floating profit/loss dalam presentase
                  </li>
                  <li>
                    <strong>Weight %</strong> — Besaran persentase emiten terkait dibandingkan dengan 100% dari total
                    investasi saya
                  </li>
                  <li>
                    <strong>Change</strong> — Penambahan atau pengurangan jumlah lot yang terjadi pada emiten tersebut
                  </li>
                </ul>
              </section>
            </section>

            <section className='space-y-2'>
              <p>
                Tabel kedua bernama Saham Dilepas. Tabel ini diisi dengan emiten yang saya sudah saya jual seluruhnya,
                atau sudah saya lepas dari portofolio investasi saya.
              </p>

              <Image src={Image2} alt='' quality={100} draggable={false} />
            </section>
          </section>

          <section className='space-y-6'>
            <section className='space-y-2 text-left'>
              <p className='md:text-2xl text-lg font-medium'>2. Metrics</p>

              <p>
                Di laman ini, anda akan melihat data-data penting dari investasi saya. Halaman ini juga sebagai
                rangkuman dari hasil investasi saya. Anda bisa melihat Total profit, Total (realised) profit, Total
                portofolio value, hingga Pie chart industry yang merupakan pembagian industri dari masing-masing emiten
                yang saya investasikan.
              </p>
            </section>

            <Image src={Image3} alt='' quality={100} draggable={false} />
          </section>

          <section className='space-y-6'>
            <section className='space-y-2 text-left'>
              <p className='md:text-2xl text-lg font-medium'>3. Transaksi</p>

              <p>
                Laman ini dibuat khusus untuk Anda yang penasaran dengan data transaksi saya. Melalui laman ini, anda
                bisa melihat seluruh data jual beli dari emiten yang saya investasikan, beserta jumlah lot dan harga
                saya menjual/membelinya. Supaya makin mudah, data transaksi ini dibagi berdasarkan perbulan.
              </p>
            </section>

            <Image src={Image4} alt='' quality={100} draggable={false} />
          </section>
        </section>

        <Alert>
          <Terminal className='h-4 w-4' />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Harga saham yang tertera pada aplikasi akan diperbaharui secara berkala setiap hari ketika market sudah
            tutup.
          </AlertDescription>
        </Alert>
      </section>

      <section className='mt-4 space-y-4'>
        <h3 className='text-left md:text-3xl text-xl font-medium'>Halaman Analisis</h3>

        <p>
          Kalau anda mau tau secara detail alasan kenapa saya berinvestasi di suatu perusahaan, anda bisa membaca
          analisis dari masing-masing emiten investasi saya di laman ini. Laman ini akan senantiasa saya <em>update</em>{' '}
          jika saya menulis analisis terbaru.
        </p>
      </section>

      <section className='mt-4 space-y-4'>
        <h3 className='text-left md:text-3xl text-xl font-medium'>Halaman Courses</h3>

        <p>
          Untuk anda yang penasaran dengan pendekatan investasi saya, anda bisa explore laman ini. Di laman ini, saya
          akan membagikan pengetahuan saya terkait berinvestasi di pasar saham.
        </p>

        <section className='space-y-2'>
          <p>Ada 3 pembahasan yang akan ada di laman tersebut:</p>

          <ul className='list-disc list-outside ml-6 space-y-2 text-left'>
            <li>Fundamental analysis</li>
            <li>Investing psychology</li>
            <li>Technical analysis</li>
            <li>Portfolio management</li>
          </ul>
        </section>
      </section>

      <p>
        Jika ada pertanyaan atau kendala, silahkan gunakan fitur <ChatWithUs />
      </p>

      <p>
        <em>Regards</em>,
        <br />
        Alvin
      </p>
    </section>
  )
}
