import React from "react";
import "./RepoHeader.css";
import { connect } from "react-redux";
import { AppState } from "Store";
import { ApiConsts } from "ApiConsts";
import { SearchIState } from "Store/Search/types";
import { serviceSearchRS, showSearchResultRS } from "Store/Search/actions";

interface Props {
  searchRS: SearchIState;
  showSearchResultRS: typeof showSearchResultRS;
  serviceSearchRS: (
    url: string,
    method: string,
    clearExistingResult: boolean
  ) => Promise<void>;
}

interface State {
  searchTerm: string;
  searchItems: any[];
  showSuggestions: boolean;
  rowPerPage: number;
  page: number;
  sortBy: string;
  order: string;
  sortFields: string[];
  showSnackBar: boolean;
}

class RepoHeader extends React.Component<Props, State> {
  public timer: any = 1;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchItems: [],
      showSuggestions: false,
      rowPerPage: 30,
      page: 1,
      sortBy: "full_name",
      order: "asc",
      sortFields: ["full_name", "name", "forks"],
      showSnackBar: false,
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", this.trackScrolling.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling.bind(this));
  }

  public isBottom(el: any) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  public trackScrolling() {
    const wrappedElement = document.getElementById("repoElement");
    if (!!wrappedElement && this.isBottom(wrappedElement)) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.searchServiceCall(false, false);
        }
      );
      document.removeEventListener("scroll", this.trackScrolling.bind(this));
    }
  }

  public searchServiceCall(
    clearExistingResult: boolean,
    showSuggestion: boolean
  ) {
    if (this.state.searchTerm.length > 0) {
      this.props
        .serviceSearchRS(
          `https://api.github.com/search/repositories?q=${this.state.searchTerm.toLowerCase()}&per_page=${
            this.state.rowPerPage
          }&page=${this.state.page}&sort=${this.state.sortBy}&order=${
            this.state.order
          }`,
          ApiConsts._GET,
          clearExistingResult
        )
        .then(() => {
          if (this.props.searchRS.success) {
            this.setState({
              searchItems: this.props.searchRS.search?.data?.items,
              showSuggestions: showSuggestion,
            });
          } else if (this.props.searchRS.error) {
            this.setState({ showSnackBar: true }, () => {
              setTimeout(() => {
                this.setState({ showSnackBar: false });
              }, 3000);
            });
          }
        });
    }
  }

  public debounce(clearOldItems: boolean) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.searchServiceCall(clearOldItems, true);
    }, 500);
  }

  public search(search: string) {
    const removeSearch =
      this.state.searchTerm.toLowerCase().indexOf(search.toLowerCase()) > -1;
    this.props.showSearchResultRS(false);
    this.setState(
      {
        searchTerm: search,
      },
      () => {
        if (this.state.searchTerm.length === 0) {
          this.setState({
            showSuggestions: false,
            searchItems: [],
          });
        } else {
          this.debounce(!removeSearch);
        }
      }
    );
  }

  public render() {
    return (
      <div className="header">
        <div className="row">
          <div className="col-2 pt-5">
            <div className="innerRow">
              <div className="col-3 p-0">
                <i
                  className="fab fa-github gitHubIcon"
                  data-testid="app-logo"
                ></i>
              </div>
              <div className="col-9 pt-8" data-testid="app-header-text">
                GitHub Repo Search
              </div>
            </div>
          </div>
          <div className="col-5 pt-5">
            <div className="innerRow searchInput">
              <input
                type="search"
                data-testid="repo-search-input"
                className="searchField"
                placeholder="Repo Search"
                value={this.state.searchTerm}
                onChange={(event: any) => {
                  this.search(event.target.value);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    this.setState({
                      showSuggestions: false,
                    });
                  }, 500);
                }}
                onKeyDown={(e: any) => {
                  if (e.which === 13) {
                    this.props.showSearchResultRS(true);
                    e.preventDefault();
                  }
                }}
              />
              <span
                className="searchIcon"
                onClick={() => {
                  this.props.showSearchResultRS(true);
                }}
              >
                <i
                  className="fas fa-search padtop-2"
                  data-testid="search-icon"
                ></i>
              </span>
            </div>
          </div>
          {this.state.showSuggestions && (
            <div className="suggestions">
              {this.state.searchItems.slice(0, 6).map((item) => {
                return (
                  <div
                    className="row suggestionsItem"
                    key={`${item.id}-suggest`}
                  >
                    <a href={item.clone_url} target="_blank">
                      <div className="col-1">
                        <i className="fas fa-hammer"></i>
                      </div>
                      <div className="col-11">{item.full_name}</div>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
          <div className="col-2 pt-5">
            <div className="innerRow sortBy">
              <label className="headerText pt-10">Sort By</label>
              <select
                className="sortFiled ml-10"
                value={this.state.sortBy}
                data-testid="sort-by-select"
                onChange={(event: any) => {
                  this.setState(
                    {
                      sortBy: event.target.value,
                    },
                    () => {
                      this.searchServiceCall(true, false);
                    }
                  );
                }}
              >
                {this.state.sortFields.map((field) => {
                  return (
                    <option value={field} key={field}>
                      {field}
                    </option>
                  );
                })}
              </select>
              {this.state.order === "asc" && (
                <div
                  className="searchIcon"
                  onClick={() => {
                    this.setState(
                      {
                        order: "desc",
                      },
                      () => {
                        this.searchServiceCall(true, false);
                      }
                    );
                  }}
                >
                  <i className="fas fa-sort-alpha-down"></i>
                </div>
              )}
              {this.state.order === "desc" && (
                <div
                  className="searchIcon"
                  onClick={() => {
                    this.setState(
                      {
                        order: "asc",
                      },
                      () => {
                        this.searchServiceCall(true, false);
                      }
                    );
                  }}
                >
                  <i className="fas fa-sort-alpha-up"></i>
                </div>
              )}
            </div>
          </div>
          <div className="col-3 pt-10">
            <div className="innerRow">
              <div>
                <span className="headerText">Total hits: </span>
                <span className="headerText">
                  {this.props.searchRS.search?.data?.total_count}
                </span>
              </div>
              <div className="pl-20">
                <span className="headerText">Records shown: </span>
                <span className="headerText">
                  {this.props.searchRS.showSearchResult
                    ? this.props.searchRS.search?.data?.items.length
                    : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.state.showSnackBar && (
          <div className="snackbarArea">
            <span className="snackbar">Service failed</span>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  searchRS: state.search,
});
const mapDispatchToProps = {
  serviceSearchRS,
  showSearchResultRS,
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoHeader);
