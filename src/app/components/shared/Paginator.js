
import React from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import PaginatorButton from './PaginatorButton';
import PaginatorArray from './PaginatorArray';
import KeyBoardNavigation from './KeyBoardNavigation'


const paginatorItem = (props) => {
    const { items, children: Paginator, pageSize, currentPage, columns, selectedElement, className } = props;
    const pItems = new PaginatorArray(items);
    const totalPages = pItems.getTotalPages(pageSize);
    const { children: PageItem } = Paginator.props
    const paginated = [].concat(pItems.paginate(currentPage, pageSize));
    return (

       
        <Transition.Group as={Grid} duration={500} animation='scale' className={className}>

            {paginated.map((child, i) =>
                (
                    <Grid.Column width={columns} key={child.id} textAlign='center'>
                        <div>
                            {/* {React.cloneElement(PageItem, { ...child, selected: i === position ? true : false })} */}
                            <PageItem.type {...child } {...PageItem.props} selected={ i === selectedElement ? true : false} />
                        </div>
                    </Grid.Column>
                )
            )}

        </Transition.Group>

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
    componentDidMount(){
        if(this.props.columns){
            KeyBoardNavigation.setColumns(this.props.columns)
        }
    }

    
    nextPage() {
        const { currentPage } = this.state;
        const { items } = this.props;
        const pResults = new PaginatorArray(items);


        if (currentPage < pResults.getTotalPages(this.props.pageSize)) {
            this.setState({ 'currentPage': currentPage + 1 });
            this.forceUpdate();
        }
    }

    prevPage() {
        const { currentPage } = this.state;

        if (currentPage > 0) {
            this.setState({ 'currentPage': currentPage - 1 });

        }
    }
    navigate(e) {
        
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