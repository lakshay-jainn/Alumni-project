import { Post } from "@/protectedPages/feeds/components/post";

const samplePosts = [
  {
    id: "1",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Software Engineer",
    },
    image: "/pic.jpg",
    caption: "Just finished a great coding session! #coding #productivity",
    likes: 42,
    isLiked: false,
    comments: [
      {
        id: "1",
        author: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Great work! What were you working on?",
        timestamp: "2023-06-01T10:00:00Z",
        likes: 5,
        isLiked: false,
      },
      {
        id: "2",
        author: "Bob Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Looks interesting! Keep it up!",
        timestamp: "2023-06-01T11:30:00Z",
        likes: 3,
        isLiked: true,
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Alice Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "UX Designer",
    },
    caption:
      "Just had a breakthrough on our latest project! Sometimes all it takes is a fresh perspective and a cup of coffee. ☕️💡 #UXDesign #Eureka",
    likes: 78,
    isLiked: true,
    comments: [
      {
        id: "3",
        author: "Charlie Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Can't wait to see what you've come up with!",
        timestamp: "2023-06-02T09:15:00Z",
        likes: 7,
        isLiked: true,
      },
      {
        id: "4",
        author: "Diana Prince",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Coffee is the secret ingredient to all great designs!",
        timestamp: "2023-06-02T10:45:00Z",
        likes: 4,
        isLiked: false,
      },
    ],
  },
  {
    id: "3",
    author: {
      name: "Emily Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Product Manager",
    },
    
    caption:
      "Team brainstorming session in action. Love seeing all these creative ideas come together! #ProductDevelopment #Teamwork",
    likes: 65,
    isLiked: false,
    comments: [
      {
        id: "5",
        author: "Frank Lee",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Looks like a productive session! Can't wait to see the results.",
        timestamp: "2023-06-03T14:20:00Z",
        likes: 8,
        isLiked: true,
      },
      {
        id: "6",
        author: "Grace Kim",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "Teamwork makes the dream work! 💪",
        timestamp: "2023-06-03T15:05:00Z",
        likes: 6,
        isLiked: false,
      },
    ],
  },
]

export default function Home() {
  return (
    <section className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Professional Social Feed</h1>
      {samplePosts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </section>
  )
}

