import { Download } from 'lucide-react';
import { notices } from '../data/mockData'; // In your local file

const NoticeBoardPage = () => {
    const handleDownload = (notice) => {
      if (window.jspdf) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setProperties({ title: notice.title });
        doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.text("Springdale Public School", 20, 20);
        doc.setDrawColor(245, 158, 11); doc.line(20, 23, 190, 23);
        doc.setFontSize(16); doc.text(notice.title, 20, 35);
        doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(100, 115, 132); doc.text(`Date: ${notice.date}`, 20, 42);
        doc.setFontSize(12); doc.setTextColor(51, 65, 85);
        const contentLines = doc.splitTextToSize(notice.content, 170);
        doc.text(contentLines, 20, 55);
        const filename = `Notice-${notice.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
        doc.save(filename);
      } else { alert("PDF generation library is not available. Please try again later."); }
    };

    return (
    <div className="py-20 bg-slate-100 animate-fade-in-up"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-4xl font-bold text-center text-slate-800 mb-12">Notice Board</h2><div className="max-w-4xl mx-auto space-y-6">{notices.map((notice, index) => (<div key={notice.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-amber-500 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}><div className="flex justify-between items-start gap-4"><div><h3 className="text-xl font-semibold text-slate-800">{notice.title}</h3><span className="text-sm text-slate-500">{notice.date}</span></div><button onClick={() => handleDownload(notice)} className="flex-shrink-0 flex items-center gap-2 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 font-semibold px-3 py-2 rounded-md transition-colors text-sm" title="Download as PDF"><Download size={16} /> <span className="hidden sm:inline">Download</span></button></div><p className="mt-3 text-slate-700">{notice.content}</p></div>))}</div></div></div>
    );
};
export default NoticeBoardPage; // This would be uncommented in your local file