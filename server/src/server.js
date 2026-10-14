import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'development_only_change_this_secret';

const profileSchema = new mongoose.Schema({
  fullName: String, dob: String, gender: String, email: String, mobile: String, nationality: String, state: String, district: String, address: String,
  qualification: String, college: String, passingYear: String, percentage: String, category: String, jobAppliedFor: String, departmentName: String, postName: String,
  skills: String, interests: String, location: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profile: profileSchema
}, { timestamps: true });

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: String,
  qualification: [String],
  category: String,
  ageMin: Number,
  ageMax: Number,
  salary: String,
  deadline: String,
  examDate: String,
  location: String,
  description: String,
  officialUrl: String,
  documents: [String],
  source: String,
  verified: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: String,
  jobTitle: String,
  department: String,
  status: { type: String, default: 'Applied' },
  createdAt: { type: Date, default: Date.now }
});

const savedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: String, required: true }
}, { timestamps: true });
savedSchema.index({ userId: 1, jobId: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
const Saved = mongoose.models.Saved || mongoose.model('Saved', savedSchema);

const sampleJobs = [
  { title: 'SSC Combined Graduate Level (CGL)', department: 'Staff Selection Commission', qualification: ['Degree', 'B.Tech', 'Postgraduate'], category: 'Central Government', ageMin: 18, ageMax: 32, salary: 'As per post / 7th CPC', deadline: '2026-11-02', examDate: 'To be announced', location: 'All India', description: 'Demonstration listing for various Group B and Group C posts. Check the current official notice for post-wise conditions.', officialUrl: 'https://ssc.gov.in/', documents: ['Photo', 'Signature', 'Graduation certificate', 'Valid ID proof'], source: 'Official SSC website', verified: false },
  { title: 'Railway Recruitment – NTPC', department: 'Railway Recruitment Boards', qualification: ['12th Pass', 'Degree', 'B.Tech'], category: 'Central Government', ageMin: 18, ageMax: 33, salary: 'As per post and notification', deadline: '2026-10-28', examDate: 'To be announced', location: 'All India', description: 'Demonstration listing. Eligibility varies by post and recruitment notice.', officialUrl: 'https://www.rrbcdg.gov.in/', documents: ['Photo', 'Signature', 'Educational certificates'], source: 'Official RRB website', verified: false },
  { title: 'UPSC Civil Services Examination', department: 'Union Public Service Commission', qualification: ['Degree', 'B.Tech', 'Postgraduate'], category: 'Central Government', ageMin: 21, ageMax: 32, salary: 'As per service and pay rules', deadline: '2027-02-01', examDate: 'To be announced', location: 'All India', description: 'Example listing only. Check official notification for dates, attempts, age relaxations and eligibility.', officialUrl: 'https://upsc.gov.in/', documents: ['Photo', 'Signature', 'Degree certificate', 'Photo ID'], source: 'Official UPSC website', verified: false },
  { title: 'SSC MTS / Havaldar', department: 'Staff Selection Commission', qualification: ['10th Pass'], category: 'Central Government', ageMin: 18, ageMax: 27, salary: 'As per official notification', deadline: '2026-11-12', examDate: 'To be announced', location: 'All India', description: 'Demonstration category for matriculation-pass recruitment. Confirm active vacancy and eligibility on official website.', officialUrl: 'https://ssc.gov.in/', documents: ['Photo', 'Signature', '10th certificate', 'Valid ID proof'], source: 'Official SSC website', verified: false },
  { title: 'Bank Recruitment Opportunities', department: 'Public Sector Banks / IBPS', qualification: ['Degree', 'B.Tech', 'Postgraduate'], category: 'Banking', ageMin: 20, ageMax: 28, salary: 'As per bank notification', deadline: '2026-10-25', examDate: 'To be announced', location: 'State-wise vacancies', description: 'Example category, not a claim of an active vacancy. Check the bank or IBPS recruitment website.', officialUrl: 'https://www.ibps.in/', documents: ['Photo', 'Signature', 'Degree certificate'], source: 'Official bank/IBPS website', verified: false },
  { title: 'State Government Group Recruitment', department: 'State Public Service Commission', qualification: ['12th Pass', 'Degree', 'B.Tech', 'Diploma'], category: 'State Government', ageMin: 18, ageMax: 35, salary: 'Depends on state and post', deadline: '2026-11-20', examDate: 'To be announced', location: 'Select your state', description: 'Example listing category. Check the state PSC or official department website for active notifications.', officialUrl: 'https://www.india.gov.in/', documents: ['Photo', 'Signature', 'Educational certificates'], source: 'Official state recruitment portal', verified: false }
];

let cachedDbPromise = null;
let isSeeded = false;

async function seed() {
  if (isSeeded) return;
  try {
    if (await Job.countDocuments() === 0) {
      await Job.insertMany(sampleJobs);
    }
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const exists = await User.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });
      if (!exists) {
        const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
        await User.create({
          username: process.env.ADMIN_USERNAME || 'admin',
          email: process.env.ADMIN_EMAIL.toLowerCase(),
          passwordHash,
          role: 'admin'
        });
        console.log('Admin account created from environment settings.');
      }
    }
    isSeeded = true;
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    return null;
  }
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (!cachedDbPromise) {
    cachedDbPromise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    }).then(async (m) => {
      console.log('MongoDB connected');
      await seed();
      return m;
    }).catch((err) => {
      cachedDbPromise = null;
      console.error('MongoDB connection failed:', err.message);
      throw err;
    });
  }
  return cachedDbPromise;
}

// Database middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    // Continue so fallback/demo responses can still be returned
  }
  next();
});

function authToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

function requireAuth(req, res, next) {
  const value = req.headers.authorization || '';
  const token = value.startsWith('Bearer ') ? value.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Please log in to continue.' });
  try {
    req.auth = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
  }
}

function requireAdmin(req, res, next) {
  if (req.auth?.role !== 'admin') return res.status(403).json({ message: 'Admin access required.' });
  next();
}

const router = express.Router();

router.get('/health', (req, res) => {
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({
    ok: true,
    message: 'GovtJob Portal API is running',
    database: states[mongoose.connection.readyState] || 'unknown',
    hasMongoUri: Boolean(process.env.MONGODB_URI)
  });
});

router.post('/auth/register', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      if (!process.env.MONGODB_URI) {
        return res.status(503).json({ message: 'Database configuration missing: MONGODB_URI environment variable is not set in Vercel.' });
      }
      return res.status(503).json({ message: 'Database is not connected. Please check your MONGODB_URI credentials and MongoDB Atlas IP access (0.0.0.0/0).' });
    }
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'Username, email, and password are required.' });
    if (password.length < 8) return res.status(400).json({ message: 'Password must contain at least 8 characters.' });
    const exists = await User.findOne({ $or: [{ username: username.trim() }, { email: email.toLowerCase().trim() }] });
    if (exists) return res.status(409).json({ message: 'Username or email is already registered.' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username: username.trim(), email: email.toLowerCase().trim(), passwordHash });
    res.status(201).json({ token: authToken(user), user: { id: user._id, username: user.username, email: user.email, role: user.role }, profile: null });
  } catch (e) {
    console.error('Registration error:', e);
    res.status(500).json({ message: e.message || 'Could not create account.' });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      if (!process.env.MONGODB_URI) {
        return res.status(503).json({ message: 'Database configuration missing: MONGODB_URI environment variable is not set in Vercel.' });
      }
      return res.status(503).json({ message: 'Database is not connected. Please check your MONGODB_URI credentials and MongoDB Atlas IP access (0.0.0.0/0).' });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ $or: [{ email: (email || '').toLowerCase().trim() }, { username: (email || '').trim() }] });
    if (!user || !await bcrypt.compare(password || '', user.passwordHash)) return res.status(401).json({ message: 'Invalid email/username or password.' });
    res.json({ token: authToken(user), user: { id: user._id, username: user.username, email: user.email, role: user.role }, profile: user.profile || null });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ message: e.message || 'Could not log in.' });
  }
});

router.get('/profile', requireAuth, async (req, res) => {
  const user = await User.findById(req.auth.id).select('profile username email');
  if (!user) return res.status(404).json({ message: 'User not found.' });
  res.json({ profile: user.profile || null, username: user.username, email: user.email });
});

router.put('/profile', requireAuth, async (req, res) => {
  try {
    const allowed = ['fullName', 'dob', 'gender', 'email', 'mobile', 'nationality', 'state', 'district', 'address', 'qualification', 'college', 'passingYear', 'percentage', 'category', 'jobAppliedFor', 'departmentName', 'postName', 'skills', 'interests', 'location'];
    const profile = {};
    for (const key of allowed) profile[key] = String(req.body[key] ?? '').trim();
    if (!profile.fullName || !profile.dob || !profile.email || !profile.mobile || !profile.state || !profile.district || !profile.qualification || !profile.category) {
      return res.status(400).json({ message: 'Please complete all required profile fields.' });
    }
    const user = await User.findByIdAndUpdate(req.auth.id, { profile }, { new: true }).select('profile');
    res.json({ message: 'Profile saved successfully.', profile: user.profile });
  } catch {
    res.status(500).json({ message: 'Could not save profile.' });
  }
});

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({ active: true }).sort({ deadline: 1 }).lean();
    res.json(jobs.length ? jobs : sampleJobs.map((j, i) => ({ ...j, _id: `demo-${i + 1}` })));
  } catch {
    res.json(sampleJobs.map((j, i) => ({ ...j, _id: `demo-${i + 1}` })));
  }
});

router.get('/applications', requireAuth, async (req, res) => {
  try {
    res.json(await Application.find({ userId: req.auth.id }).sort({ createdAt: -1 }).lean());
  } catch {
    res.status(500).json({ message: 'Could not load applications.' });
  }
});

router.post('/applications', requireAuth, async (req, res) => {
  try {
    const { jobId, jobTitle, department } = req.body;
    if (!jobTitle) return res.status(400).json({ message: 'Job title is required.' });
    const old = await Application.findOne({ userId: req.auth.id, jobId: String(jobId) });
    if (old) return res.json({ message: 'This job is already in your tracker.', application: old });
    const application = await Application.create({ userId: req.auth.id, jobId: String(jobId || ''), jobTitle, department, status: 'Applied' });
    res.status(201).json({ message: 'Application added to tracker.', application });
  } catch {
    res.status(500).json({ message: 'Could not track this application.' });
  }
});

router.patch('/applications/:id', requireAuth, async (req, res) => {
  try {
    const allowed = ['Interested', 'Preparing Documents', 'Ready to Apply', 'Applied', 'Admit Card Released', 'Examination Completed', 'Result Announced', 'Selected', 'Not Selected'];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid application status.' });
    const item = await Application.findOneAndUpdate({ _id: req.params.id, userId: req.auth.id }, { status: req.body.status }, { new: true });
    if (!item) return res.status(404).json({ message: 'Application not found.' });
    res.json(item);
  } catch {
    res.status(500).json({ message: 'Could not update application.' });
  }
});

router.get('/saved', requireAuth, async (req, res) => {
  try {
    res.json(await Saved.find({ userId: req.auth.id }).lean());
  } catch {
    res.json([]);
  }
});

router.post('/saved', requireAuth, async (req, res) => {
  try {
    const jobId = String(req.body.jobId || '');
    if (!jobId) return res.status(400).json({ message: 'Job ID required.' });
    const old = await Saved.findOne({ userId: req.auth.id, jobId });
    if (old) {
      await old.deleteOne();
      return res.json({ saved: false });
    }
    await Saved.create({ userId: req.auth.id, jobId });
    res.status(201).json({ saved: true });
  } catch {
    res.status(500).json({ message: 'Could not update saved jobs.' });
  }
});

router.get('/admin/jobs', requireAuth, requireAdmin, async (req, res) => {
  try {
    res.json(await Job.find().sort({ createdAt: -1 }).lean());
  } catch {
    res.json([]);
  }
});

router.post('/admin/jobs', requireAuth, requireAdmin, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (e) {
    res.status(400).json({ message: 'Could not create job. Check required fields.' });
  }
});

router.put('/admin/jobs/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    res.json(job);
  } catch {
    res.status(400).json({ message: 'Could not update job.' });
  }
});

router.delete('/admin/jobs/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found.' });
    res.json({ message: 'Job removed.' });
  } catch {
    res.status(500).json({ message: 'Could not delete job.' });
  }
});

// Mount router under both /api and / to handle all routing environments seamlessly
app.use('/api', router);
app.use('/', router);

if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`GovtJob Portal API listening on http://localhost:${PORT}`));
}

export default app;
