import { Card, CardContent } from "./ui/card"

export const Footer = () => {
  // Renders
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            @ 2024 <span className="font-bold">Soares Dev LTDA</span>. All
            rights reserved.
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
