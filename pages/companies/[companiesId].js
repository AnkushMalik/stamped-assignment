const Company = (props) => {
    return(
        <div>
            {props.companiesId}
        </div>
    )
}

Company.getInitialProps = async (ctx) => {
  let { companiesId } = ctx.query
  return { companiesId }
}

export default Company
