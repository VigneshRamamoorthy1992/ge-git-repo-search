import React from "react";
import "./RepoItems.css";
import { connect } from "react-redux";
import { AppState } from "Store";
import { SearchIState } from "Store/Search/types";

interface Props {
  searchRS: SearchIState;
}

interface State {}

class RepoItems extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  public render() {
    return (
      <div className="container" data-testid="container-items">
        {this.props.searchRS.showSearchResult && (
          <div className="row" id="repoElement" data-testid="repo-element">
            {this.props.searchRS.search?.data?.items.map(
              (item: any, index: number) => {
                return (
                  <div className="repoCard" key={`${item.id}-${index}-card`}>
                    <div className="cardImg">
                      <img src={item.owner.avatar_url} className="img" data-testid="user-avatar"/>
                    </div>
                    <div className="cardDetails">
                      <span className="repoLink">
                        <a href={item.clone_url} target="_blank">
                          {item.full_name}
                        </a>
                      </span>
                      <div className="repoDesc" data-testid="description">{item.description}</div>
                      <div className="metaDetails">
                        <div className="metaInfo">
                          <span className="metaInfoLabel">
                            <i className="far fa-id-badge"></i>
                          </span>
                          <span className="pill" data-testid="repo-license">
                            {!!item.license?.name ? item.license?.name : "NA"}
                          </span>
                        </div>
                        <div className="metaInfo">
                          <span className="metaInfoLabel">
                            <i className="fas fa-database"></i>
                          </span>
                          <span className="pill" data-testid="repo-size">{item.size}KB</span>
                        </div>
                        <div className="metaInfo">
                          <span className="metaInfoLabel">
                            <i className="fas fa-code-branch"></i>
                          </span>
                          <span className="pill" data-testid="repo-forks">{item.forks}</span>
                        </div>
                        <div className="metaInfo">
                          <span className="metaInfoLabel">
                            <i className="fas fa-eye"></i>
                          </span>
                          <span className="pill" data-testid="repo-watchers"> {item.watchers}</span>
                        </div>
                        <div className="metaInfo">
                          <span className="metaInfoLabel">
                            <i className="far fa-plus-square"></i>
                          </span>
                          <span className="pill" data-testid="repo-created-on">
                            {item.created_at.split("T")[0]}
                          </span>
                        </div>
                        <div className="metaInfo">
                          <span className="metaInfoLabel">
                            <i className="fas fa-pen"></i>
                          </span>
                          <span className="pill" data-testid="repo-updated-on">
                            {item.updated_at.split("T")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  searchRS: state.search,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RepoItems);
