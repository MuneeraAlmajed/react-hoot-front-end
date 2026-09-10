import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate, useParams, Link } from 'react-router';
import * as hootService from '../../services/hootService';
import CommentForm from '../CommentForm/CommentForm';

const HootDetails = (props) => {
  const { hootId } = useParams();
  const [hoot, setHoot] = useState(null);
  const {user} = useContext(UserContext); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    };

    fetchHoot();
  }, [hootId]);

const handleAddComment = async (commentFormData) => {
  const newComment = await hootService.createComment(hootId, commentFormData);
  setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
};

  console.log('hoot state:', hoot);
  if(!hoot) return <main>Loading . . .</main>

const handleDeleteHoot = async () => {
  await props.handleDeleteHoot(hootId);
};

  return (
  <main>
    <section>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>
          {`${hoot.author.username} posted on
          ${new Date(hoot.createdAt).toLocaleDateString()}`}
        </p>
      </header>

      <p>{hoot.text}</p>

      {user._id === hoot.author._id && (
        <>
        <Link to={`/hoots/${hootId}/edit`}>Edit</Link>

        <button onClick={handleDeleteHoot}>Delete</button>
        </>
      )}
    </section>

    <section>
       <h2>Comments</h2>

       <CommentForm handleAddComment={handleAddComment}/>

  {!hoot.comments.length && <p>There are no comments.</p>}

  {hoot.comments.map((comment) => (
    <article key={comment._id}>
      <header>
        <p>
          {`${comment.author.username} posted on
          ${new Date(comment.createdAt).toLocaleDateString()}`}
        </p>
      </header>
      <p>{comment.text}</p>
    </article>
  ))}
    </section>
  </main>
);
};

export default HootDetails;