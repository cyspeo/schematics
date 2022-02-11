// <copyright file="Application.cs" company="Safran">
//     Copyright (c) Safran. All rights reserved.
// </copyright>

namespace Safran.ESuitePortal.Domain.UserModule.Aggregate
{
    using BIA.Net.Core.Domain;
    using System.Collections.Generic;

    /// <summary>
    /// The application entity.
    /// </summary>
    public class User : VersionedTable, IEntity
    {
        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        public int Id { get; set; }
    }
}