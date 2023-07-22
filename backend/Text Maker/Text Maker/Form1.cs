using IronOcr;
using System.Windows.Forms;

namespace Text_Maker
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Button1_Click(object sender, EventArgs e)
        {
            openFileDialog1.Filter = "Image Files(*.jpg; *.jpeg; *.gif; *.bmp)|*.jpg; *.jpeg; *.gif; *.bmp";
            openFileDialog1.ShowDialog();
            var ocr = new IronTesseract();
            ocr.Language = OcrLanguage.Polish;
            richTextBox1.Text = ocr.Read(openFileDialog1.FileName).Text;
        }
    }
}