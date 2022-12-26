import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

// Вызывается первым
export const getStaticPaths: GetStaticPaths = async () => {
  // Должен возвращать обязательную структуру
  // Expected: { paths: [], fallback: boolean }
  // Где paths список все возможных путей для localhost/posts/*.js
  const paths = getAllPostIds();
  return {
    paths,
    // [ { params: { id }, fallback }, { params: { id }, fallback }]
    // В params должен обязательно содержатся ключ id

    fallback: false,
    /* false - любые пути, которые не возвращаются, getStaticPaths приведут к странице 404
     *
     * true:
     * - Пути, возвращенные из getStaticPaths, будут преобразованы в HTML во время сборки.
     * - Пути, которые не были сгенерированы во время сборки, не приведут к странице 404.
     *   Вместо этого Next.js будет обслуживать «откатную» версию страницы при первом запросе
     *   такого пути.
     * - В фоновом режиме Next.js статически сгенерирует запрошенный путь. Последующие запросы
     *   к тому же пути будут обслуживать сгенерированную страницу, как и другие страницы,
     *   предварительно отображаемые во время сборки.
     *
     * blocking - пути будут отображаться на стороне сервера с помощью getStaticProps и
     * кэшироваться для будущих запросов, поэтому это происходит только один раз для каждого пути.
     */
  };
};

// Вызывается вторым
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

// Вызывается в послед. очередь
// How is work: https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
