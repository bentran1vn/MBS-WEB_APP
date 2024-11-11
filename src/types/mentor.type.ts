export interface Mentor {
  id: string
  email: string
  fullName: string
  point: number
  skills: Skill[]
  createdAtUtc: string
  createdOnUtc: string
}

interface Skill {
  skillName: string
  skillDesciption: string
  skillCategoryType: string
  cetificates: Certificate[]
}

interface Certificate {
  cetificateName: string
  cetificateDesciption: string
  cetificateImageUrl: string
  createdOnUtc: string
}

export interface MentorsResponse {
  items: Mentor[]
  pageIndex: number
  pageSize: number
  totalCount: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface MentorConfig {
  searchTerm?: string
  pageIndex?: number | string
  pageSize?: number | string
}
