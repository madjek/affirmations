import { AffirmationCategory } from '~/lib/constants/affirmation';

export interface Affirmation {
  id: string;
  text: string;
  category: AffirmationCategory;
  language?: string;
  createdByUser?: boolean;
  createdByMe?: boolean;
  saved?: boolean;
  isPublic?: boolean;
  isApproved?: boolean;
  createdAt: Date;
}

export interface AffirmationIdList {
  affirmationIds: string[];
}

export interface CreateAffirmation {
  text: string;
  category: AffirmationCategory;
  language: string;
  isPublic?: boolean;
}
