import { useNavigate } from 'react-router-dom'
import '../styles/common.css'

export default function BackHeader({ title, rightElement }) {
  const navigate = useNavigate()

  return (
    <header className="header">
      <button className="btn-back" onClick={() => navigate(-1)}>
        <img src="/images/detail_btn_back.svg" alt="뒤로가기" />
      </button>
      <div className="header-title">{title}</div>
      <div className="header-placeholder">
        {rightElement}
      </div>
    </header>
  )
}
