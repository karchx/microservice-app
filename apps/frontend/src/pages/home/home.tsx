import { useState } from 'react';
import { ArtilceList, Banner, Link } from '../../components';
import { useArticlesWithAuthorsQuery } from '@microservice-app/data-access';

type TabType = 'global' | 'feed';

export interface HomeProps {}

export function Home(props: HomeProps) {
  const [activeTab, setActiveTab] = useState<TabType>('global');

  const { data, loading } = useArticlesWithAuthorsQuery();

  if (loading && !data) {
    return null;
  }

  const tabSelect = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="home-page">
        <Banner>
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </Banner>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {/*validar que exista token (inicio de sesion)*/}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/"
                    onClick={() => tabSelect('feed')}
                  >
                    Your feed
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/"
                    onClick={() => tabSelect('global')}
                  >
                    Global feed
                  </Link>
                </li>
              </ul>
            </div>

            {/* Feed */}
            {loading ? (
              <div className="article-preview">loading...</div>
            ) : !data ? (
              <div className="article-preview">No articles are here...yet.</div>
            ) : (
              <ArtilceList data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
