import { Document, Page, pdfjs } from 'react-pdf';
import CarouselSlider from '../../../../ui/carousel-slider/carousel-slider';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const pdfs = Array.from(
  Array(6),
  (_, idx) =>
    `http://localhost:3333/static/mock/users/sertificates/${idx + 1}.pdf`
);

export const Sertificates = () => {
  return (
    <CarouselSlider
      style={{ width: 1042 }}
      id="sert"
      options={{ slidesPerView: 3 }}
      title="Дипломы и сертификаты"
      slides={pdfs.map((file) => (
        <Document
          key={file}
          file={file}
          options={options}
          className="pdf-slide"
        >
          <Page pageNumber={1} width={294} />
        </Document>
      ))}
    />
  );
};
