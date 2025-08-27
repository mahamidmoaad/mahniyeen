// src/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-white mt-12 border-t">
        <div className="container mx-auto py-6 text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} المهنيين — كل الحقوق محفوظة
        </div>
      </footer>
    )
  }
  