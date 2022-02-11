// <copyright file="<%= classify(name)%>Mapper.cs" company="Safran">
//     Copyright (c) Safran. All rights reserved.
// </copyright>

namespace Safran.ESuitePortal.Domain.<%= classify(name)%>Module.Aggregate
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Text;
    using System.Threading.Tasks;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Dto.Option;
    using Safran.ESuitePortal.Domain.Dto.<%= classify(name)%>;

    /// <summary>
    /// The mapper used for <%= classify(name)%>.
    /// </summary>
    public class <%= classify(name)%>Mapper : BaseMapper<<%= classify(name)%>Dto, <%= classify(name)%>>
    {
        /// <summary>
        /// Gets or sets the collection used for expressions to access fields.
        /// </summary>
        public override ExpressionCollection<<%= classify(name)%>> ExpressionCollection
        {
            get
            {
                return new ExpressionCollection<<%= classify(name)%>>
                {
                    { nameof(<%= classify(name)%>.Id), <%= name%> => <%= classify(name)%>.Id },
                };
            }
        }

        /// <summary>
        /// Create a <%= classify(name)%> DTO from a entity.
        /// </summary>
        /// <returns>The <%= classify(name)%> DTO.</returns>
        public override Expression<Func<<%= classify(name)%>, <%= classify(name)%>Dto>> EntityToDto()
        {
            return entity => new <%= classify(name)%>Dto
            {
                Id = entity.Id,
            };
        }

        /// <summary>
        /// Create a <%= classify(name)%> entity from a DTO.
        /// </summary>
        /// <param name="dto">The <%= classify(name)%> DTO.</param>
        /// <param name="entity">The entity to update.</param>
        public override void DtoToEntity(<%= classify(name)%>Dto dto, <%= classify(name)%> entity)
        {
            entity.Id = dto.Id;
        }
    }
}