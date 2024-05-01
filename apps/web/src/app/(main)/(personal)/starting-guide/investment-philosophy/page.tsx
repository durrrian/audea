import { ChatWithUs } from '../chat-with-us'

export default function Page() {
  return (
    <section className='w-full h-fit space-y-8 text-justify'>
      <h1 className='md:text-4xl text-2xl font-semibold mb-10 text-left'>Investment Philosophy</h1>

      <p className='font-medium text-left'>Selamat datang di Supercuan Saham.</p>

      <p>
        Sebelumnya kami mengucapkan terima kasih atas kepercayaan yang anda berikan. Goal dari Supercuan Porto Sharing
        adalah membagikan informasi mengenai portfolio saham & approach investasi saya yang teman-teman bisa ikutin
        untuk cuan jangka panjang & consistently beat the market.
      </p>

      <section className='text-left space-y-2'>
        <p>Di Supercuan Saham, kita menggunakan 3 strategi utama dalam berinvestasi saham:</p>
        <ul className='list-disc list-outside ml-6 space-y-2'>
          <li>
            <strong>Value investing</strong> — focus on business value not current price
          </li>
          <li>
            <strong>Strategic diversification</strong> — picking winners in each potential sector
          </li>
          <li>
            <strong>Risk management</strong> — quickly eliminate losers and weightage adjustment
          </li>
        </ul>
      </section>

      <section className='space-y-2'>
        <p>
          Jadi kita tidak fokus ke “yang penting cuan” tapi kita akan konsisten dalam approach kita selama kita
          berinvestasi, kita tidak akan melakukan hal yang di luar prinsip kita seperti:
        </p>
        <ul className='list-disc list-outside ml-6 space-y-2 text-left'>
          <li>Investasi di saham gorengan / yang tidak mempunyai fundamental atau business case yang kuat</li>
          <li>Membiarkan floating loss meskipun fundamental suatu saham telah berubah karena alasan “sayang”</li>
          <li>
            Mengambil resiko yang terlalu besar dalam berinvestasi seperti alokasi weightage yang terlalu besar di satu
            saham
          </li>
        </ul>
      </section>

      <p>
        Karena jika kita melakukan tiga hal di atas, return jangka panjang kita mempunyai chance besar untuk jadi tidak
        maksimal meskipun secara jangka pendek kita mungkin bisa mendapat return yang lebih bagus. Analoginya seperti
        orang ke kasino, dia akan potensi mendapatkan keuntungan yang besar selama 1 atau 3 hari kedepan dan technically
        bisa mendapat return sebesar 500% dari uangnya atau bahkan lebih, tapi kalau kita tarik timeframenya ke 1 tahun
        atau lebih, apakah dia akan masih untung? Jawabannya adalah tidak.
      </p>

      <section className='text-left space-y-2'>
        <p>Ini juga sejalan dengan 3 values kita pegang:</p>
        <ul className='list-disc list-outside ml-6 space-y-2 text-left'>
          <li>No day-trading — no research has shown day-traders making more money</li>
          <li>Patience — investing is boring but doing right, it produces great wealth</li>
          <li>No shortcuts — seek for quick profits eventually lead to downfall in the future</li>
        </ul>
      </section>

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
