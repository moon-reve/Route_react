import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/common.css'
import '../styles/inquiry.css'

const BOT_NAME = '루티 (Rooty)'

const FAQ = [
  {
    q: 'Route란?',
    a: 'Route는 커리어 전환 준비를 위한 앱이에요.\n\n개인화된 AI 학습 루트를 제공하고, 강의·기록을 한곳에서 관리할 수 있어요. 이직 준비의 모든 것, 루트에서 시작하세요!',
  },
  {
    q: '항로 만들기란?',
    a: '나만의 항로 만들기는 나에게 맞는 커리어 루트를 설계하는 5단계 과정이에요.\n\n하지 않아도 Route를 이용할 수 있지만, 완료하면 개인화된 AI가 맞춤형 커리큘럼을 제공해드려요. 5분이면 충분하니 하는 걸 추천드려요! 😊',
  },
  {
    q: '로그 작성 방법',
    a: '하단 중앙의 ✏️ 버튼을 눌러 로그를 작성할 수 있어요. 오늘 학습한 내용, 느낀 점 등을 자유롭게 기록해보세요.\n꾸준히 쌓인 기록은 나중에 면접 준비할 때 큰 도움이 될 거예요!',
  },
  {
    q: '저장 아티클 확인',
    a: 'Log 탭 → 로그 피드에서 저장한 아티클을 확인할 수 있어요.',
    image: '/images/faq_log_feed.png',
  },
  {
    q: '피드백 확인 방법',
    a: '두 곳에서 확인할 수 있어요! Log 탭 → 피드백 탭에서 프로젝트별로 받은 피드백을 모아볼 수 있고, Route 탭(로드맵)에서 완료된 프로젝트 옆 피드백 버튼을 눌러도 바로 확인할 수 있어요.',
  },
  {
    q: '요금 안내',
    a: '네, 현재 Route는 무료로 이용하실 수 있어요. 더 다양한 기능은 계속 업데이트 예정이에요!',
  },
]

const GREETING = '안녕하세요! 루티(Rooty)예요 🚀\n무엇이 궁금하신가요?'

export default function InquiryPage() {
  const navigate = useNavigate()
  const [messages, setMessages]   = useState([{ type: 'bot', text: GREETING, chips: true }])
  const [input, setInput]         = useState('')
  const [isTyping, setIsTyping]   = useState(false)
  const [faqDone, setFaqDone]     = useState(false)
  const [showFaq, setShowFaq]     = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef   = useRef(null)
  const inputRef       = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const addBotMessage = (text, image = null) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { type: 'bot', text, ...(image && { image }) }])
    }, 800)
  }

  const handleFAQ = (item) => {
    setFaqDone(true)
    setShowFaq(false)
    setMessages(prev => [...prev, { type: 'user', text: item.q }])
    addBotMessage(item.a, item.image || null)
  }

  const handleSend = () => {
    const text = inputRef.current?.value?.trim() ?? ''
    if (!text) return
    inputRef.current.value = ''
    setInput('')
    setFaqDone(true)
    setMessages(prev => [...prev, { type: 'user', text }])

    // 키워드 매칭
    const matched = FAQ.find(f =>
      f.q.includes(text) ||
      text.includes('무료') && f.q.includes('무료') ||
      text.includes('로그') && f.q.includes('로그') ||
      text.includes('프리') && f.q.includes('프리') ||
      text.includes('피드백') && f.q.includes('피드백') ||
      text.includes('아티클') && f.q.includes('아티클') ||
      text.includes('서비스') && f.q.includes('서비스')
    )
    addBotMessage(
      matched
        ? matched.a
        : '죄송해요, 아직 해당 질문에 대한 답변을 준비 중이에요. 아래 자주 묻는 질문을 참고해주세요! 😊'
    )
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setFaqDone(true)
    setMessages(prev => [...prev, { type: 'user', image: url }])
    addBotMessage('이미지를 받았어요! 문의 내용을 함께 입력해주시면 더 빠르게 도와드릴 수 있어요 😊')
    e.target.value = ''
  }

  return (
    <div className="screen">
      <div className="inquiry-wrap">

        {/* 헤더 */}
        <header className="inquiry-header">
          <button className="inquiry-back" onClick={() => navigate(-1)}>
            <img src="/images/pre_header.svg" alt="뒤로가기" />
          </button>
          <div className="inquiry-header-center">
            <img src="/images/chat_bot_v12.svg" alt="bot" className="inquiry-header-avatar" />
            <span className="inquiry-header-name">{BOT_NAME}</span>
          </div>
          <div style={{ width: 36 }} />
        </header>

        {/* 채팅 영역 */}
        <div className="inquiry-messages">

          {messages.map((msg, i) => (
            <div key={i} className={`msg-row msg-row--${msg.type}`}>
              {msg.type === 'bot' && (
                <img src="/images/chat_bot_v12.svg" alt="bot" className="msg-avatar" />
              )}
              <div className={`msg-bubble msg-bubble--${msg.type}`}>
                {msg.image && msg.type === 'user'
                  ? <img src={msg.image} alt="첨부" className="msg-image" />
                  : msg.text.split('\n').map((line, j) => (
                      <span key={j}>{line}{j < msg.text.split('\n').length - 1 && <br/>}</span>
                    ))
                }
                {msg.type === 'bot' && msg.image && (
                  <img src={msg.image} alt="안내 이미지" className="msg-image msg-image--bot" />
                )}
                {msg.chips && (
                  <div className="bubble-chips">
                    {FAQ.map((item, i) => (
                      <button key={i} className="bubble-chip" onClick={() => handleFAQ(item)}>
                        {item.q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* 타이핑 인디케이터 */}
          {isTyping && (
            <div className="msg-row msg-row--bot">
              <img src="/images/chat_bot_v12.svg" alt="bot" className="msg-avatar" />
              <div className="msg-bubble msg-bubble--bot msg-bubble--typing">
                <span className="typing-dot"/><span className="typing-dot"/><span className="typing-dot"/>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* FAQ 토글 패널 */}
        {showFaq && (
          <div className="faq-panel">
            <div className="faq-panel-title">자주 묻는 질문</div>
            <div className="faq-panel-chips">
              {FAQ.map((item, i) => (
                <button key={i} className="faq-chip" onClick={() => handleFAQ(item)}>
                  {item.q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 입력창 */}
        <div className="inquiry-input-bar">
          {/* + 이미지 업로드 */}
          <button className="inquiry-plus" onClick={() => fileInputRef.current?.click()}>
            <span className="inquiry-plus-icon">+</span>
          </button>
          {/* ? FAQ 토글 */}
          <button
            className={`inquiry-faq-toggle${showFaq ? ' inquiry-faq-toggle--active' : ''}`}
            onClick={() => setShowFaq(v => !v)}
          >?</button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />

          {/* 텍스트 입력 */}
          <input
            type="text"
            className="inquiry-input"
            placeholder="메시지를 입력하세요"
            ref={inputRef}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />

          {/* 전송 버튼 */}
          <button
            className={`inquiry-send${input.trim() ? ' inquiry-send--active' : ''}`}
            onClick={handleSend}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 15V3M9 3L4 8M9 3L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}
