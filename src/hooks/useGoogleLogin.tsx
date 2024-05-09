import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { LogoGoogleImage } from '@/assets/images'

// Tạo interface cho props của hook
interface GoogleLoginProps {
  clientId: string
  callback: (response: google.accounts.id.CredentialResponse) => void
}

const buttonLoginId = 'googleSignInButton'

const useGoogleLogin = ({ clientId, callback }: GoogleLoginProps) => {
  useEffect(() => {
    const id = 'google-js'
    // Hàm để tải thư viện Google API
    const loadGoogleScript = () => {
      const src = 'https://accounts.google.com/gsi/client'

      // Tránh tải script nhiều lần
      if (document.getElementById(id)) {
        return
      }

      const js = document.createElement('script')
      js.async = true
      js.id = id
      js.src = src
      js.onload = initGoogleAuth // Gọi hàm khởi tạo khi script được tải xong

      document.head.appendChild(js)
    }

    // Hàm để khởi tạo Google Auth library
    const initGoogleAuth = () => {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: callback,
      })

      google.accounts.id.renderButton(
        document.getElementById(`${buttonLoginId}`)!,
        {
          locale: 'vi',
          theme: 'outline',
          type: 'icon',
          shape: 'pill',
        }
      )
    }

    loadGoogleScript()

    return () => {
      const element = document.getElementById(id)
      if (element) {
        element.parentNode?.removeChild(element)
      }
    }
  }, [clientId, callback]) // Phụ thuộc useEffect để đảm bảo nó chỉ chạy một lần

  const onclick = () => {
    const buttonHidden = document.getElementById(buttonLoginId)

    if (buttonHidden) {
      const buttonReal = buttonHidden.querySelector(
        '[role="button"]'
      ) as HTMLElement

      if (buttonReal) {
        buttonReal.click()
      }
    }
  }

  // Trả về JSX của nút đăng nhập để sử dụng trong component
  return (
    <>
      <button className="hidden" id={`${buttonLoginId}`}></button>
      <Button variant="outline" className="py-6" onClick={onclick}>
        <img src={LogoGoogleImage} alt="logo google" />
        <span className="ml-2">Google</span>
      </Button>
    </>
  )
}

export default useGoogleLogin
