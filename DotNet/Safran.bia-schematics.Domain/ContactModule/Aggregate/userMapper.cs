// <copyright file="UserMapper.cs" company="Safran">
//     Copyright (c) Safran. All rights reserved.
// </copyright>

namespace Safran.ESuitePortal.Domain.UserModule.Aggregate
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Text;
    using System.Threading.Tasks;
    using BIA.Net.Core.Domain;
    using BIA.Net.Core.Domain.Dto.Option;
    using Safran.ESuitePortal.Domain.Dto.User;

    /// <summary>
    /// The mapper used for User.
    /// </summary>
    public class UserMapper : BaseMapper<UserDto, User>
    {
        /// <summary>
        /// Gets or sets the collection used for expressions to access fields.
        /// </summary>
        public override ExpressionCollection<User> ExpressionCollection
        {
            get
            {
                return new ExpressionCollection<User>
                {
                    { nameof(User.Id), User => User.Id },
                };
            }
        }

        /// <summary>
        /// Create a User DTO from a entity.
        /// </summary>
        /// <returns>The User DTO.</returns>
        public override Expression<Func<User, UserDto>> EntityToDto()
        {
            return entity => new UserDto
            {
                Id = entity.Id,
            };
        }

        /// <summary>
        /// Create a User entity from a DTO.
        /// </summary>
        /// <param name="dto">The User DTO.</param>
        /// <param name="entity">The entity to update.</param>
        public override void DtoToEntity(UserDto dto, User entity)
        {
            entity.Id = dto.Id;
        }
    }
}