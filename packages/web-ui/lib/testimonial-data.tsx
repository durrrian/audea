import Budi from '@repo/assets/testimonial/Budi.webp'
import Andy from '@repo/assets/testimonial/Andy.webp'
import Felicia from '@repo/assets/testimonial/Felicia.webp'
import Syahriana from '@repo/assets/testimonial/Syahriana.webp'
import Hisyam from '@repo/assets/testimonial/Hisyam.webp'
import Sav from '@repo/assets/testimonial/Sav.webp'
import Nico from '@repo/assets/testimonial/Nico.webp'
import Puspita from '@repo/assets/testimonial/Puspita.webp'
import Tiara from '@repo/assets/testimonial/Tiara.webp'
import Caroline from '@repo/assets/testimonial/Caroline.webp'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'

export type TestimonialData = {
  syntax: JSX.Element
  from: string
  cred: string | undefined
  img: string | StaticImport | null
}

export const testimonialData = [
  {
    syntax: (
      <>
        <p>
          Saya dari dulu mau banget beli subscribe Supercuan Saham waktu masih ada lifetime tapi karena belum ada modal
          cukup dihold dulu sampe akhirnya baru bisa realisasikan di bulan juli lalu.
        </p>

        <p>
          Dalam kurung satu bulan porto saya yang awalnya cuma 260K, <strong>bisa naik hingga 900 sampe 1000K</strong>,
          itu sangat wah menurut saya dalam kurung waktu 1 bulan walaupun ada beberapa porto yang masih merah,
          harapannya sih semoga supercuan bisa kasih fasilitas layanan yang menarik lagi, apalagi kalau lifetime
          subscribe dibuka lagi heheh
        </p>
      </>
    ),
    from: 'Hisyam',
    cred: 'UI/UX Designer',
    img: Hisyam,
  },

  {
    syntax: (
      <>
        <p>
          <strong>Koh Alvin as a founder Supercuan BUKAN seperti kebanyakan orang</strong> jualan produk dengan cuma
          nunjukkin hasil cuan berapa banyak, teknik yang dipakai dan quick rich scheme.
        </p>

        <p>
          <strong>Koh Alvin mengedukasi untuk bijak dan tidak asal dalam ambil keputusan investasi</strong> serta most
          importantly beliau juga sangat passionate dan experienced di dunia investasi. Di situlah saya ambil keputusan
          untuk join Supercuan yang menitikberatkan kepada value investing. Dan sejak join sebentar,{' '}
          <strong>portofolio saya sudah grow sekitar 6%</strong> (unrealized profit){' '}
          <strong>jauh melebihi performa IHSG</strong>. Saya tidak perlu liatin pergerakkan saham setiap hari. Seperti
          layaknya fund manager, Supercuan akan beri update informasi seputar portfolio, watchlist dan juga bisa Q&A.
        </p>
      </>
    ),
    from: 'Andy',
    cred: 'Manager at UOB Bank',
    img: Andy,
  },

  {
    syntax: (
      <>
        <p>
          Semenjak bergabung, <strong>selalu mendapatkan cuan dan pilihan portofolionya semua ok</strong>. Hal ini
          sesuai dengan konsep investing saya. Banyak pilihan di portofolio supercuan, tidak semua harus diikuti.
        </p>

        <p>Hasilnya juga mantep. Semakin bersemangat untuk investing saham berkat supercuan grup setiap harinya.</p>
      </>
    ),
    from: 'Antonius Budi',
    cred: 'Manager at multinational beauty company',
    img: Budi,
  },

  {
    syntax: (
      <>
        <p>
          Baru 2 bulan join SupercuanSaham saya sudah <strong>mendapatkan return -+ 10%</strong>.
        </p>

        <p>Mantap banget sih, asal sabar.</p>
      </>
    ),
    from: 'Syahriana',
    cred: 'Bidan',
    img: Syahriana,
  },

  {
    syntax: (
      <>
        <p>
          Padahal baru Juni ikut, dan belum termasuk dividen2 yang udah kudapetin{' '}
          <strong>untungku udah 5x lipat+++</strong> yang aku bayar di awal, padahal baru 3 bulan.
        </p>

        <p>Ga nyesel samsek pake guidance Supercuan super worth it menurutku!</p>
      </>
    ),
    from: 'Felicia',
    cred: 'Finance Trainee at Philip Morris International',
    img: Felicia,
  },

  {
    syntax: (
      <>
        <p>
          Ikut Supercuan Saham ngebantu banget buat aku nentuin{' '}
          <strong>pilihan saham yang ok untuk di buy, sell, atau hold </strong> karena dikasih akses porto kak Alvin
          langsung.{' '}
        </p>

        <p>
          Selain itu disini juga bagus fiturnya, kita dikasih <strong> insight dan online course </strong> yang bisa
          kita play terus di web app & buat yg belum expert kaya aku dikasih arahan untuk baca{' '}
          <strong>artikel yang beginner friendly </strong> juga.
        </p>
      </>
    ),
    from: 'Savera',
    cred: 'Business Development Manager at RIGI',
    img: Sav,
  },

  {
    syntax: (
      <>
        <p>
          Porto saya suda gain lumayan, dapat sampingan dari deviden{' '}
          <strong>pluss dapat spill porto saham luar negri</strong> yg tak perna saya temui di grup VIP lain 😊
        </p>
      </>
    ),
    from: 'Puspita',
    cred: 'Corporate Secretary - PT ITC Finance',
    img: Puspita,
  },

  {
    syntax: (
      <>
        <p>
          Portfolio dari Supercuan bermanfaat buat saya sebagai benchmarking atas portfolio saya.{' '}
          <strong>Terutama dari sisi weight dan stock selection.</strong>
        </p>
      </>
    ),
    from: 'Nico',
    cred: 'Chief Information Security - AWS Indonesia',
    img: Nico,
  },

  {
    syntax: (
      <>
        <p>
          Saham pilihannya trustworthy dan banyak ilmu yang dishare.{' '}
          <strong>Ini sebulan udah naik sekitar 4,5% ga usah mantengin tiap hari.</strong>
        </p>
      </>
    ),
    from: 'Tiara',
    cred: 'Coordinator - Stealth Mode Startup',
    img: Tiara,
  },

  {
    syntax: (
      <>
        <p>
          Semenjak bergabung, <strong>selalu mendapatkan cuan dan pilihan portofolionya semua ok</strong>. Hal ini
          sesuai dengan konsep investing saya. Banyak pilihan di portofolio supercuan, tidak semua harus diikuti.
          Hasilnya juga mantep. Semakin bersemangat untuk investing saham berkat supercuan grup setiap harinya.
        </p>
      </>
    ),
    from: 'Emir',
    cred: undefined,
    img: null,
  },

  {
    syntax: (
      <>
        <p>
          Supercuan emang ga kaleng kaleng. Meskipun saya masih newbie, sudah banyak dapat view dan masukkan dari Bro
          Alvin. Gausah ragu buat yg baru mau join dan baru join. Di sini full pakai{' '}
          <strong>prinsip value investing dan bukan pom2 apalagi trading</strong>.
        </p>
      </>
    ),
    from: 'John',
    cred: undefined,
    img: null,
  },

  {
    syntax: (
      <>
        <p>
          Masih sibuk kerja 9-5 jadi tidak ada waktu buat cek trend saham, berita, ataupun laporan keuangan, trus
          ditambah porto minus 65-70%, trus pas liat SupercuanSaham di IG tertarik dan daftar paket yg 1 tahun.
        </p>

        <p>
          Pas hari daftar ada beberapa porto yg di share oke, gw cuman coba invest 2, dan{' '}
          <strong>kurang dari 2 minggu udah balik modal biaya perdaftaran 1 tahun</strong>, selain itu bakalan dishare
          juga berita tentang saham jadi member bisa tau aksi yg harus dilakukan, pokok nya SupercuanSaham OKE banget
          bagi yang tidak punya waktu mantau2 dan analisa saham.
        </p>
      </>
    ),
    from: 'Akbar',
    cred: undefined,
    img: null,
  },

  {
    syntax: (
      <>
        <p>
          Sebagai anak kuliahan yg baru mulai perjalanan dalam dunia investasi saham, Supercuan helpful bgt buat aku!
          Awalnya, bingung cara pilih saham yg ok dan ga mau ambil resiko yg terlalu besar. Tp{' '}
          <strong>sejak gabung supercuan, jadi lbh pede berinvestasi</strong> karna pilihan saham Ko Alvin bagus dan
          return sahamku jg meningkat.
        </p>
      </>
    ),
    from: 'Carolina',
    cred: 'Student at Simon Fraser University, Canada',
    img: Caroline,
  },
]
