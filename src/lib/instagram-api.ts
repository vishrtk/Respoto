import axios from 'axios';

const GRAPH_API_URL = 'https://graph.facebook.com/v18.0';

// Define interfaces for API responses
interface FacebookPage {
  id: string;
  access_token: string;
  name?: string;
}

interface InstagramBusinessAccount {
  id: string;
}

interface FacebookPagesResponse {
  data: FacebookPage[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

interface InstagramProfileResponse {
  id: string;
  username: string;
  profile_picture_url?: string;
  name?: string;
  biography?: string;
  follows_count?: number;
  followers_count?: number;
  media_count?: number;
}

interface MediaResponse {
  data: MediaItem[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

interface MediaItem {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
  timestamp: string;
  username: string;
  comments_count?: number;
  like_count?: number;
}

interface CommentsResponse {
  data: CommentItem[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

interface CommentItem {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  like_count?: number;
}

interface ReplyResponse {
  id: string;
  text: string;
}

export class InstagramApiClient {
  private accessToken: string;

  constructor(accessToken: string)   {
    this.accessToken = accessToken;
  }

  /**
   * Get the Instagram Business Account ID associated with the user
   */
  async getInstagramBusinessAccountId(): Promise<string> {
    try {
      // First, get the user's Facebook Pages
      const pagesResponse = await axios.get<FacebookPagesResponse>(`${GRAPH_API_URL}/me/accounts`, {
        params: {
          access_token: this.accessToken,
        },
      });

      if (!pagesResponse.data.data || pagesResponse.data.data.length === 0) {
        throw new Error('No Facebook Pages found for this user');
      }

      // For each page, check if there's an Instagram Business Account
      for (const page of pagesResponse.data.data) {
        const pageId = page.id;
        const pageAccessToken = page.access_token;

        const instagramResponse = await axios.get<{instagram_business_account?: InstagramBusinessAccount}>(`${GRAPH_API_URL}/${pageId}`, {
          params: {
            fields: 'instagram_business_account',
            access_token: pageAccessToken,
          },
        });

        if (instagramResponse.data.instagram_business_account) {
          return instagramResponse.data.instagram_business_account.id;
        }
      }

      throw new Error('No Instagram Business Account found for any of the user\'s Facebook Pages');
    } catch (error) {
      console.error('Error getting Instagram Business Account ID:', error);
      throw error;
    }
  }

  /**
   * Get the Instagram Business Account profile information
   */
  async getProfile(): Promise<InstagramProfileResponse> {
    try {
      const instagramAccountId = await this.getInstagramBusinessAccountId();

      const profileResponse = await axios.get<InstagramProfileResponse>(`${GRAPH_API_URL}/${instagramAccountId}`, {
        params: {
          fields: 'id,username,profile_picture_url,name,biography,follows_count,followers_count,media_count',
          access_token: this.accessToken,
        },
      });

      return profileResponse.data;
    } catch (error) {
      console.error('Error getting Instagram profile:', error);
      throw error;
    }
  }

  /**
   * Get recent media from the Instagram Business Account
   */
  async getRecentMedia(limit = 25): Promise<MediaResponse> {
    try {
      const instagramAccountId = await this.getInstagramBusinessAccountId();

      const mediaResponse = await axios.get<MediaResponse>(`${GRAPH_API_URL}/${instagramAccountId}/media`, {
        params: {
          fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,comments_count,like_count',
          limit,
          access_token: this.accessToken,
        },
      });

      return mediaResponse.data;
    } catch (error) {
      console.error('Error getting recent media:', error);
      throw error;
    }
  }

  /**
   * Get comments for a specific media
   */
  async getMediaComments(mediaId: string, limit = 50): Promise<CommentsResponse> {
    try {
      const commentsResponse = await axios.get<CommentsResponse>(`${GRAPH_API_URL}/${mediaId}/comments`, {
        params: {
          fields: 'id,text,username,timestamp,like_count',
          limit,
          access_token: this.accessToken,
        },
      });

      return commentsResponse.data;
    } catch (error) {
      console.error(`Error getting comments for media ${mediaId}:`, error);
      throw error;
    }
  }

  /**
   * Reply to a comment
   */
  async replyToComment(commentId: string, message: string): Promise<ReplyResponse> {
    try {
      const replyResponse = await axios.post<ReplyResponse>(`${GRAPH_API_URL}/${commentId}/replies`, null, {
        params: {
          message,
          access_token: this.accessToken,
        },
      });

      return replyResponse.data;
    } catch (error) {
      console.error(`Error replying to comment ${commentId}:`, error);
      throw error;
    }
  }

  /**
   * Send a private reply to a comment
   */
  async sendPrivateReply(commentId: string, message: string): Promise<{success: boolean}> {
    try {
      const privateReplyResponse = await axios.post<{success: boolean}>(`${GRAPH_API_URL}/${commentId}/private_replies`, null, {
        params: {
          message,
          access_token: this.accessToken,
        },
      });

      return privateReplyResponse.data;
    } catch (error) {
      console.error(`Error sending private reply to comment ${commentId}:`, error);
      throw error;
    }
  }
}
