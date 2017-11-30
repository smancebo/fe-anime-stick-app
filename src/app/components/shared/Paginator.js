
import React from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import PaginatorButton from './PaginatorButton';
import PaginatorArray from './PaginatorArray';
import KeyBoardNavigation from './KeyBoardNavigation'


const paginatorItem = (props) => {
    const { items, children: Paginator, pageSize, currentPage, columns, selectedElement, className, animated } = props;
    const pItems = new PaginatorArray(items);

    const { children: PageItem } = Paginator.props
    const paginated = [].concat(pItems.paginate(currentPage, pageSize));
    let animatedProps = {};

    let ParentComponent = Grid
    if (animated) {
        ParentComponent = Transition.Group
        animatedProps = { animation: 'browse', duration: 500, as: Grid }
    }
    return (

        <ParentComponent {...animatedProps} className={className} >
            {paginated.map((child, i) =>
                (
                    <Grid.Column width={columns} key={child.id} textAlign='center'>
                        <div>
                            {/* {React.cloneElement(PageItem, { ...child, selected: i === position ? true : false })} */}
                            <PageItem.type
                                {...child }
                                {...PageItem.props}
                                selected={i === selectedElement ? true : false} />
                        </div>
                    </Grid.Column>
                )
            )}
        </ParentComponent>
    )
}

class Paginator extends React.Component {

    constructor(props) {
        super(props);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.navigate = this.navigate.bind(this);
       
        
        this.state = {
            currentPage: 1,
            selectedElement: 0
        }
    }
    componentDidMount() {
        const { columns, currentPage, onLastUp } = this.props;

        if (onLastUp) {
            KeyBoardNavigation.on('onLastUp', onLastUp);
        }
        if (columns) {
            KeyBoardNavigation.setColumns(columns)
        }
        if (currentPage) {
            this.setState({ currentPage });
        }
    }

    componentWillReceiveProps(newProps) {
        const { selectedElement, selectedPage } = newProps;
        if (selectedElement !== undefined) {
            this.setState({ selectedElement })
            KeyBoardNavigation.index = selectedElement;
        }
        if (selectedPage) {

            this.setState({ currentPage: selectedPage })
        }

    }

    nextPage() {
        const { currentPage } = this.state;
        const { items, onNextPage } = this.props;
        const pResults = new PaginatorArray(items);


        if (currentPage < pResults.getTotalPages(this.props.pageSize)) {
            let newPage = currentPage + 1;;
            this.setState({ 'currentPage': newPage });
            if (onNextPage) {
                onNextPage(newPage)
            }
        }
    }

    prevPage() {
        const { currentPage } = this.state;
        const { onBackPage } = this.props;
        if (currentPage > 1) {

            let newPage = currentPage - 1;
            if (currentPage > 0) {
                this.setState({ 'currentPage': newPage });
                if (onBackPage) {
                    onBackPage(newPage);
                }

            }
        }
    }
    navigate(e) {
        if (e.keyCode === 227) { //backward
            this.prevPage();
            e.preventDefault();
            return;
        }
        if (e.keyCode === 228) {
            this.nextPage();
            e.preventDefault();
            return;
        }
        KeyBoardNavigation.navigate(this.props.pageSize, e);
        this.setState({ selectedElement: KeyBoardNavigation.index });
    }


    render() {
        const { children, items, pageSize, className } = this.props;
        const { currentPage, selectedElement } = this.state;
        const pItems = new PaginatorArray(items);
        const totalPages = pItems.getTotalPages(pageSize);

        const childrenWithProps = React.cloneElement(children, { ...this.props, currentPage, totalPages, pageSize, selectedElement });
        return (
            <div onKeyDown={this.navigate}>
                <Grid className={className}>
                    <Grid.Column width={2} verticalAlign='middle' className='paginator-left'>
                        <PaginatorButton backward floated='left' onClick={this.prevPage} style={{ 'display': currentPage === 1 ? 'none' : 'block' }} />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {childrenWithProps}
                    </Grid.Column>
                    <Grid.Column width={2} verticalAlign='middle' className='paginator-right'>
                        {items.length !== 0 && <PaginatorButton forward floated='right' onClick={this.nextPage} style={{ 'display': currentPage === totalPages ? 'none' : 'block' }} />}
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

Paginator.Paginate = paginatorItem




export default Paginator;