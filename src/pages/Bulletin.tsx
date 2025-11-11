import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimationWrapper from '@/components/AnimationWrapper';
import { FileText, Download, Maximize2, Minimize2, X } from 'lucide-react';

// --- Google Drive PDF file IDs ---
const pdfFiles = {
  'July-2025': '1HRRqhiuJIrOzChxt-SfaaFnOWuq-jrdg',
  'August-2025': '1wRTNBYPr2gLsgTdL-Cz4hsdbngBLDqHl',
  'September-2025': '1Fy5mcdadNAo2_u4BOdRK19HCxo_4H5xN',
  'October-2025': '1JoC-BbeoHBoKWpdUvatnVwBRrd1n8Ui1',
};

// --- Helper functions ---
const getPdfViewerUrl = (fileId: string) =>
  `https://drive.google.com/file/d/${fileId}/preview`;

const getPdfDownloadUrl = (fileId: string) =>
  `https://drive.google.com/uc?export=download&id=${fileId}`;

// --- Page turn sound effect ---
const pageTurnSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');

const Bulletin = () => {
  const [currentPdf, setCurrentPdf] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    document.title = 'Bulletin | Rotaract KPRCAS';
    pageTurnSound.load(); // preload audio for smoother UX
  }, []);

  const bulletins = [
    { id: 1, title: 'July 2025', date: 'July-2025', content: 'Bulletin for July 2025' },
    { id: 2, title: 'August 2025', date: 'August-2025', content: 'Bulletin for August 2025' },
    { id: 3, title: 'September 2025', date: 'September-2025', content: 'Bulletin for September 2025' },
    { id: 4, title: 'October 2025', date: 'October-2025', content: 'Bulletin for October 2025' },
  ];

  const playSound = () => {
    pageTurnSound.currentTime = 0;
    pageTurnSound.play().catch(() => {});
  };

  const handlePdfClick = (date: string) => {
    const fileId = pdfFiles[date as keyof typeof pdfFiles];
    if (fileId) {
      setCurrentPdf(getPdfViewerUrl(fileId));
      setIsViewerOpen(true);
      playSound();
    }
  };

  const handleDownloadPdf = (date: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const fileId = pdfFiles[date as keyof typeof pdfFiles];
    if (fileId) {
      const link = document.createElement('a');
      link.href = getPdfDownloadUrl(fileId);
      link.download = `bulletin-${date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      playSound();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50" />
          <img
            src="https://res.cloudinary.com/drmwtmeg3/image/upload/v1755412154/team-photo_lefoty.jpg"
            alt="Events Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <AnimationWrapper>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Monthly Bulletins</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Stay updated with our latest bulletins.
            </p>
          </AnimationWrapper>
        </div>
      </section>

      {/* Bulletins Grid */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bulletins.map((bulletin) => (
            <Card
              key={bulletin.id}
              className="h-full bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{bulletin.title}</h3>
                <p className="text-gray-600 mb-6">{bulletin.content}</p>

                <div className="flex justify-between space-x-3 mt-4">
                  <Button
                    onClick={() => handlePdfClick(bulletin.date)}
                    className="flex-1 bg-primary hover:bg-primary/90 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    onClick={(e) => handleDownloadPdf(bulletin.date, e)}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* PDF Viewer */}
      {isViewerOpen && currentPdf && (
        <PDFViewer
          currentPdf={currentPdf}
          setIsViewerOpen={setIsViewerOpen}
          pageTurnSound={pageTurnSound}
        />
      )}
    </div>
  );
};

// --- PDF Viewer Component ---
interface PDFViewerProps {
  currentPdf: string;
  setIsViewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pageTurnSound: HTMLAudioElement;
}

const PDFViewer = ({ currentPdf, setIsViewerOpen, pageTurnSound }: PDFViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  const playPageTurnSound = () => {
    pageTurnSound.currentTime = 0;
    pageTurnSound.play().catch(() => {});
  };

  const toggleFullscreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(console.error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsViewerOpen(false);
        if (document.fullscreenElement) document.exitFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[9999] animate-fade-in"
      onClick={() => {
        setIsViewerOpen(false);
        playPageTurnSound();
        if (document.fullscreenElement) document.exitFullscreen();
      }}
    >
      <div
        className="w-full h-full flex flex-col bg-white animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-900 text-white p-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Bulletin PDF Viewer</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-800"
              onClick={() => {
                setIsViewerOpen(false);
                playPageTurnSound();
                if (document.fullscreenElement) document.exitFullscreen();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 relative bg-gray-100">
          <iframe
            src={currentPdf}
            className="w-full h-full border-0"
            title="PDF Viewer"
            allowFullScreen
            allow="autoplay"
            onLoad={() => setIsPdfLoading(false)}
            style={{ height: '85vh' }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
          {isPdfLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <p className="text-gray-600 animate-pulse">Loading PDF viewer...</p>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="bg-gray-100 p-3 flex justify-end border-t">
          <a
            href={currentPdf.replace('/preview', '')}
            download
            onClick={(e) => {
              e.stopPropagation();
              playPageTurnSound();
            }}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bulletin;
