import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

// Вызывается первым
export async function getStaticPaths() {
  // Должен возвращать обязательную структуру  
  // Expected: { paths: [], fallback: boolean }
  // Где paths список все возможных путей для localhost/posts/*.js
  const paths = getAllPostIds();
  return {
    paths, // [ { params: { id }, fallback }, { params: { id }, fallback }]
           // В params должен обязательно содержатся ключ id
    fallback: false,
  };
}

// Вызывается вторым
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

// Вызывается в послед. очередь
// How is work: https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
