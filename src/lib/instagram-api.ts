import axios from 'axios';

const GRAPH_API_URL = 'https://graph.facebook.com/v18.0';

export class InstagramApiClient {
  private accessToken: string;

  constructor(accessToken: string)  {
    this.accessToken = accessToken;
  }

  /**
   * Get the Instagram Business Account ID associated with the user
   */
  async getInstagramBusinessAccountId(): Promise<string> {
    try {
      // First, get the user's Facebook Pages
      const pagesResponse = await axios.get(`${GRAPH_API_URL}/me/accounts`, {
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

        const instagramResponse = await axios.get(`${GRAPH_API_URL}/${pageId}`, {
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
  async getProfile(): Promise<any> {
    try {
      const instagramAccountId = await this.getInstagramBusinessAccountId();

      const profileResponse = await axios.get(`${GRAPH_API_URL}/${instagramAccountId}`, {
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
  async getRecentMedia(limit = 25): Promise<any> {
    try {
      const instagramAccountId = await this.getInstagramBusinessAccountId();

      const mediaResponse = await axios.get(`${GRAPH_API_URL}/${instagramAccountId}/media`, {
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
  async getMediaComments(mediaId: string, limit = 50): Promise<any> {
    try {
      const commentsResponse = await axios.get(`${GRAPH_API_URL}/${mediaId}/comments`, {
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
  async replyToComment(commentId: string, message: string): Promise<any> {
    try {
      const replyResponse = await axios.post(`${GRAPH_API_URL}/${commentId}/replies`, null, {
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
  async sendPrivateReply(commentId: string, message: string): Promise<any> {
    try {
      const privateReplyResponse = await axios.post(`${GRAPH_API_URL}/${commentId}/private_replies`, null, {
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
