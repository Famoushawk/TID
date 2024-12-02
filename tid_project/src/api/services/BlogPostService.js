import apiClient from '../client';
import { ENDPOINTS } from '../endpoints';

export const BlogPostService = {
    async getBlogPosts() {
        const response = await apiClient.get(ENDPOINTS.BLOGPOST, {
            params: { order: 'createdAt' },
        });
        return response.data.results;
},

    async createBlogPost(title, content) {
        const response = await apiClient.post(ENDPOINTS.BLOGPOST, {
            title,
            content
        });
        return response.data;
},

    async getBlogPost(blogId){
        const response = await apiClient.get(`${ENDPOINTS.BLOGPOST}/${blogId}`);
        return response.data;
}
};