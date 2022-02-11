// <copyright file="TotoMapper.cs" company="Safran">
//     Copyright (c) Safran. All rights reserved.
// </copyright>

namespace Safran.ESuitePortal.Domain.TotoModule.Aggregate
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Text;
    using System.Threading.Tasks;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Dto.Option;
    using Safran.ESuitePortal.Domain.Dto.Toto;

    /// <summary>
    /// The mapper used for Toto.
    /// </summary>
    public class TotoMapper : BaseMapper<TotoDto, Toto>
    {
        /// <summary>
        /// Gets or sets the collection used for expressions to access fields.
        /// </summary>
        public override ExpressionCollection<Toto> ExpressionCollection
        {
            get
            {
                return new ExpressionCollection<Toto>
                {
                    { nameof(Toto.Id), Toto => Toto.Id },
                };
            }
        }

        /// <summary>
        /// Create a Toto DTO from a entity.
        /// </summary>
        /// <returns>The Toto DTO.</returns>
        public override Expression<Func<Toto, TotoDto>> EntityToDto()
        {
            return entity => new TotoDto
            {
                Id = entity.Id,
            };
        }

        /// <summary>
        /// Create a Toto entity from a DTO.
        /// </summary>
        /// <param name="dto">The Toto DTO.</param>
        /// <param name="entity">The entity to update.</param>
        public override void DtoToEntity(TotoDto dto, Toto entity)
        {
            entity.Id = dto.Id;
        }
    }
}