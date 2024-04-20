import appwriteService from '../appwrite/appwrite.config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, userId }) {
    // console.log(`(in PostCard component) userId: ${userId}`)

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4 border-2 border-gray-900'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                        className='rounded-xl' />
                </div>
                <h2
                    className='text-xl font-bold'>
                    {title}</h2>
            </div>
        </Link>
    )
}

export default PostCard