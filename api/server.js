const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// رابط الاتصال السحابي المباشر الخاص بقاعدة بيانات باقر
const MONGO_URI = "mongodb+srv://fgfzfk9_db_user:sY7LfexEMjyVHKKa@cluster0.ka5nwpu.mongodb.net/portfolio?retryWrites=true&w=share";
const SECRET_PASSWORD = process.env.SECRET_PASSWORD || "123@@@123";

// الاتصال بـ MongoDB بقوة وثبات للأبد
mongoose.connect(MONGO_URI)
  .then(() => console.log("تم الاتصال بنجاح بـ MongoDB Atlas السحابية! 🚀"))
  .catch(err => console.error("خطأ في الاتصال بقاعدة البيانات:", err));

// تعريف الهيكل (Schema) لحفظ بيانات الـ Portfolio والنصوص والصور
const SiteDataSchema = new mongoose.Schema({
  title: { type: String, default: "أصمم تجارب رقمية<br>وأبني حلول الذكاء الاصطناعي" },
  desc: { type: String, default: "متخصص في تصميم واجهات المستخدم وتطوير نماذج الذكاء الاصطناعي." },
  phone: { type: String, default: "07xxxxxxxx" },
  projects: { type: Array, default: [
    { id: 1, title: "تطبيق بنك ذكي", tag: "UI/UX Design", img: "" },
    { id: 2, title: "تحليل بيانات بالذكاء الاصطناعي", tag: "AI Development", img: "" }
  ]}
}, { timestamps: true });

const SiteData = mongoose.model('SiteData', SiteDataSchema);

// دالة مساعدة لضمان جلب البيانات أو إنشاء السجل الأول الافتراضي
async function getOrCreateData() {
  let data = await SiteData.findOne();
  if (!data) {
    data = new SiteData();
    await data.save();
  }
  return data;
}

// 🔐 مسار تسجيل الدخول
app.post('/api/login', (req, res) => {
  const { password } = req.body || {};
  if (password === SECRET_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// 📂 مسار جلب البيانات للواجهة
app.get('/api/site-data', async (req, res) => {
  try {
    const data = await getOrCreateData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 💾 مسار حفظ البيانات وتحديث لوحة التحكم للأبد
app.post('/api/save-data', async (req, res) => {
  try {
    const { title, desc, phone, projects } = req.body || {};
    const currentData = await getOrCreateData();

    if (title !== undefined) currentData.title = title;
    if (desc !== undefined) currentData.desc = desc;
    if (phone !== undefined) currentData.phone = phone;
    if (projects !== undefined) currentData.projects = projects;

    await currentData.save();
    res.json({ success: true, message: "تم الحفظ في قاعدة البيانات السحابية بنجاح وثبات كامل! 💎" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🤖 مسار الـ Chatbot الذكي
app.post('/api/chatbot', (req, res) => {
  const { message, lang } = req.body || {};
  const lowerMsg = String(message || '').