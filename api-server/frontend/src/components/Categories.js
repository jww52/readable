import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import { fetchCategories, fetchPosts, getSelectedCategory } from '../actions'
import Loading from 'react-loading'

class CategoriesList extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  selectCategory = (selectedCategory) => {
    this.props.getSelectedCategory(selectedCategory);
    this.props.fetchPosts(selectedCategory);
  }

  render() {
    const { categories, error, loading } = this.props;
    return (
      <div >
        <h2>Categories:</h2>
        <div>

          {loading === true ? <div><Loading type='balls' color='#ff3647' className='loading' /></div> : null}
          {error !== undefined ? <div>{error}</div> : null}
          {!categories.length && !error
            ?
            <div>Oops no categories!</div>
            :
            categories.map((category, i) =>
              <NavLink to={`/${category.path}`}
                className="category-selector"
                activeClassName="active"
                key={i}
                onClick={() => this.selectCategory(category.name)}>{category.name}
              </NavLink>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  loading: state.categories.loading,
  error: state.categories.error,
  selectedCategory: state.categories.selectedCategory
});

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: (data) => dispatch(fetchCategories()),
    getSelectedCategory: (selectedCategory) => dispatch(getSelectedCategory(selectedCategory)),
    fetchPosts: (selectedCategory) => dispatch(fetchPosts(selectedCategory))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesList));
