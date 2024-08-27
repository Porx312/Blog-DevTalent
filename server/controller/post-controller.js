import Post from "../model/post.js";

export const createPost = async (request, response) => {
    try {
        const post = new Post(request.body);
        await post.save();

        return response.status(201).json({ message: 'Post saved successfully', post });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            request.params.id, 
            { $set: request.body }, 
            { new: true } 
        );

        return response.status(200).json({ message: 'Post updated successfully', updatedPost });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }

        await post.remove(); 

        return response.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        
        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }

        return response.status(200).json(post);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}

export const getAllPosts = async (request, response) => {
    const { username, category } = request.query;
    let filter = {};

    if (username) filter.username = username;
    if (category) filter.categories = category;

    try {
        const posts = await Post.find(filter);

        return response.status(200).json(posts);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
