import { mockArticles } from '../../../data/mockArticles';
import ArticleViewClient from './ArticleViewClient';

export function generateStaticParams() {
  return mockArticles.map((article) => ({
    id: article.id.toString(),
  }));
}

export default function Page() {
  return <ArticleViewClient />;
}
