import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import './styles/desktop.css'

import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import Onboarding1Page from './pages/Onboarding1Page'
import Onboarding2Page from './pages/Onboarding2Page'
import Onboarding3Page from './pages/Onboarding3Page'
import PreStep1Page from './pages/PreStep1Page'
import PreStep2Page from './pages/PreStep2Page'
import PreStep3Page from './pages/PreStep3Page'
import PreStep4Page from './pages/PreStep4Page'
import PreStep5Page from './pages/PreStep5Page'
import PreLoadingPage from './pages/PreLoadingPage'
import PreCompletePage from './pages/PreCompletePage'
import HomePage from './pages/HomePage'
import RoadmapPage from './pages/RoadmapPage'
import LogPage from './pages/LogPage'
import LogCalendarPage from './pages/LogCalendarPage'
import LogFeedPage from './pages/LogFeedPage'
import LogProjectPage from './pages/LogProjectPage'
import LogWritePage from './pages/LogWritePage'
import DailyMissionPage from './pages/DailyMissionPage'
import FeedbackDetailPage from './pages/FeedbackDetailPage'
import ExpertDetailPage from './pages/ExpertDetailPage'
import DetailCard1Page from './pages/DetailCard1Page'
import DetailMag1Page from './pages/DetailMag1Page'
import MyPage from './pages/MyPage'

export default function App() {
  const [hintsOn, setHintsOn] = useState(false)

  return (
    <>
      {/* 데스크탑 왼쪽 브랜딩 패널 */}
      <div className="desktop-left">
        <div className="desktop-logo-wrap">
          <img src="/images/splash_logo.svg" alt="Route" className="desktop-logo-icon" />
          <span className="desktop-logo-text">ROUTE</span>
        </div>
        <div className="desktop-divider" />
        <p className="desktop-tagline">
          멈춰있는 커리어를<br />움직이는 실행의 궤적.
        </p>
        <div className="desktop-copy">
          <p className="desktop-copy-highlight">
            나아갈 길(Route), 단단한 뿌리(Root), 진심 어린 응원(Root for)
          </p>
          <p className="desktop-copy-body">
            이 세 가지 진심을 '루트'라는 하나의 이름으로 연결했습니다.
          </p>
        </div>
      </div>

      {/* 앱 화면 + 힌트 토글 */}
      <div className={`desktop-app-wrap${hintsOn ? ' hints-on' : ''}`}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/onboarding/1" element={<Onboarding1Page />} />
        <Route path="/onboarding/2" element={<Onboarding2Page />} />
        <Route path="/onboarding/3" element={<Onboarding3Page />} />
        <Route path="/pre/1" element={<PreStep1Page />} />
        <Route path="/pre/2" element={<PreStep2Page />} />
        <Route path="/pre/3" element={<PreStep3Page />} />
        <Route path="/pre/4" element={<PreStep4Page />} />
        <Route path="/pre/5" element={<PreStep5Page />} />
        <Route path="/pre/loading" element={<PreLoadingPage />} />
        <Route path="/pre/complete" element={<PreCompletePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/log" element={<LogPage />} />
        <Route path="/log/feed" element={<LogPage />} />
        <Route path="/log/project" element={<LogPage />} />
        <Route path="/log/write" element={<LogWritePage />} />
        <Route path="/mission" element={<DailyMissionPage />} />
        <Route path="/feedback" element={<FeedbackDetailPage />} />
        <Route path="/expert" element={<ExpertDetailPage />} />
        <Route path="/detail/card/1" element={<DetailCard1Page />} />
        <Route path="/detail/mag/1" element={<DetailMag1Page />} />
        <Route path="/my" element={<MyPage />} />
          </Routes>
        </BrowserRouter>

        {/* 힌트 토글 버튼 */}
        <button
          className={`hint-toggle${hintsOn ? ' active' : ''}`}
          onClick={() => setHintsOn(!hintsOn)}
        >
          <span className="hint-dot" />
          클릭 힌트
        </button>
      </div>
    </>
  )
}
