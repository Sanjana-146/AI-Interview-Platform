import { Routes, Route } from 'react-router-dom'
import AuthContainer from '../pages/AuthContainer'
import Home from '../pages/Home'
import EmailVerify from '../pages/EmailVerify'
import ResetPassword from '../pages/ResetPassword'
import ResumeScoreChecker from '../components/ResumeScoreChecker'
import AIInterviewForm from '../components/AI-InterviewForm'
import AIInterviewRules from '../components/AI-InterviewRules'
import InterviewPanel from '../components/InterviewPanel'
import Result from '../components/result'
import Resumechecker from '../pages/Resumechecker'
import GetSuggestionsCard from '../components/GetSuggestionsCard';
import ResumeOptimizationTip from '../components/ResumeOptimizationTip';
import Dashboard from '../components/custom/Dashboard';
import TermsAndConditions from '../components/Termsandconditions'
import SupportDetail from '../pages/SupportDetail'
import SupportPage from '../pages/Supportpage';
import Disqualified from '../components/Disqualified';
import ContactUS from '../components/custom/ContactUs';



export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-interview-form" element={<AIInterviewForm />} />
            <Route path='/signup' element={<AuthContainer />}></Route>
            <Route path='/signin' element={<AuthContainer />}></Route>
            <Route path='/email-verify' element={<EmailVerify />}></Route>
            <Route path='/reset-password' element={<ResetPassword />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/rules' element={<AIInterviewRules />}></Route>
            <Route path="/interview" element={<InterviewPanel />} />
            <Route path="/result" element={<Result />} />
            <Route path='/resume-score-checker' element={<ResumeScoreChecker />} />
            <Route path='/suggestions' element={<GetSuggestionsCard />} />
            <Route path="/resume-optimization-tips" element={<ResumeOptimizationTip />} />
            <Route path='/contact' element={<ContactUS />} />
            <Route path='/resume-checker' element={<Resumechecker />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/support/:category" element={<SupportDetail />} />
            <Route path="/disqualified" element={<Disqualified />} />
        </Routes>
    );
}