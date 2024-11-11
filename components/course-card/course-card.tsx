import { Heart } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CourseCard() {
    return (
        <Card className="w-full max-w-md mt-4">
            <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
                <h2 className="text-2xl font-semibold">Course name</h2>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to favorites</span>
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="w-24 rounded-full bg-secondary px-3 py-1">
                    <p className="text-center text-sm">topic</p>
                </div>
                <p className="text-sm font-medium">23 therms</p>
                <p className="text-sm text-muted-foreground">
                    Lorem Ipsum is simply dummy text of the industry. Lorem Ipsum has been the...
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">author</span>
                    <div className="h-8 w-8 rounded-full bg-gray-200" aria-hidden="true" />
                </div>
            </CardContent>
        </Card>
    )
}