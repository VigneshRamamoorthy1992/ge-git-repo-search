import React from "react";
import "./RepoHome.css";
import { connect } from "react-redux";
import { AppState } from "Store";
import RepoHeader from "Modules/RepoHeader/RepoHeader";
import RepoItems from "Modules/RepoItems/RepoItems";
import { SearchIState } from "Store/Search/types";

interface Props {
  searchRS: SearchIState;
}

interface State {}

class RepoHome extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  public render() {
    return (
      <>
        {this.props.searchRS.loading && (
          <progress className="linearProgress loaderPosition" />
        )}
        <RepoHeader />
        <RepoItems />
      </>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  searchRS: state.search,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RepoHome);
