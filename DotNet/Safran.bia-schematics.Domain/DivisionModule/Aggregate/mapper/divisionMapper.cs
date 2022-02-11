// <copyright file="DivisionMapper.cs" company="Safran">
//     Copyright (c) Safran. All rights reserved.
// </copyright>

namespace Safran.ESuitePortal.Domain.DivisionModule.Aggregate
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Text;
    using System.Threading.Tasks;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Dto.Option;
    using Safran.ESuitePortal.Domain.Dto.Division;

    /// <summary>
    /// The mapper used for Division.
    /// </summary>
    public class DivisionMapper : BaseMapper<DivisionDto, Division>
    {
        /// <summary>
        /// Gets or sets the collection used for expressions to access fields.
        /// </summary>
        public override ExpressionCollection<Division> ExpressionCollection
        {
            get
            {
                return new ExpressionCollection<Division>
                {
                    { nameof(Division.Id), Division => Division.Id },
                };
            }
        }

        /// <summary>
        /// Create a Division DTO from a entity.
        /// </summary>
        /// <returns>The Division DTO.</returns>
        public override Expression<Func<Division, DivisionDto>> EntityToDto()
        {
            return entity => new DivisionDto
            {
                Id = entity.Id,
            };
        }

        /// <summary>
        /// Create a Division entity from a DTO.
        /// </summary>
        /// <param name="dto">The Division DTO.</param>
        /// <param name="entity">The entity to update.</param>
        public override void DtoToEntity(DivisionDto dto, Division entity)
        {
            entity.Id = dto.Id;
        }
    }
}