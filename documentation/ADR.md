# Architectural Decision Record: Modular Architecture

## Context

The app should follow a modular architecture. This approach provides clear separation of concerns, modularity, and scalability while maintaining a cohesive development experience.

## Decision

We will implement a modular monolith architecture with the following core components:

### 1. Modules (Feature Modules)

**Location**: `modules/`

Modules are isolated, independent units representing a complete user-facing feature or "feature story". Each module is a self-contained vertical slice of functionality with its own internal logic.

**Current Implementation**:

- `modules/main/` - Main application module containing the homepage with event search and listings

**Characteristics**:

- **Self-contained**: Manages its own internal routing, state, and UI.
- **Isolated**: Has no direct knowledge of other modules.
- **Communicates via Contracts**: Interacts with the system and other modules only through the defined `contracts` layer and by using services provided by the `core` and `shared` layers.

### 2. Core (Application Core)

**Location**: `core/`

The Core is the foundational layer of the system. It provides low-level services required for the application to function. Modules typically do not interact with the core directly; instead, they use the more abstract, feature-facing services provided by the `shared` layer.

**Responsibilities (What goes here?):**

- **Core Services**: `core/db/` - Database connections and clients.
- **Global Styles & Layouts**: `core/style/` - The outermost app layout and global CSS resets.
- **Environment Loading**: Bootstrapping environment variables.
- **Authentication Core**: Low-level authentication state management and client setup.

### 3. Contracts (Inter-Module Communication)

**Location**: `contracts/`

The Contracts layer defines the interfaces for how different parts of the system communicate. It is the "API" of the frontend, ensuring type-safe and reliable data exchange between modules, the core, and the backend. It contains no executable code, only definitions.

**Responsibilities (What goes here?):**

- **API Contracts**: `contracts/api/` - Zod schemas and type definitions for all API endpoints.
- **Environment Contracts**: `contracts/env/` - Type definitions for environment variables (`env.d.ts`).
- **Event Contracts**: Definitions for any cross-module events (e.g., via a message bus).

### 4. Shared (Cross-Module Services)

**Location**: `shared/`

This layer contains domain-specific features, components, and hooks that are designed to be shared and used across multiple modules. It provides abstractions over core services that modules can consume directly.

**Responsibilities (What goes here?):**

- **Shared Domain Features**: `shared/event-card/` - Logic and UI for a core business concept (e.g. presenting an event) used in multiple modules.

### 5. Libraries (Utility Libraries)

**Location**: `lib/`

Libraries are domain-agnostic, reusable code modules: pure utilities, primitives, and generic UI building blocks with no business logic. They could be extracted and used in any application unchanged.

#### Decision Framework: `shared/` vs `lib/` vs duplication

**When to put in `shared/`:**

- ✅ Feature is used by multiple modules
- ✅ Feature contains domain-specific business logic
- ✅ Feature needs to maintain state consistency across modules

**When to put in `lib/`**

- ✅ Code is completely domain-agnostic
- ✅ Code can be used in any application context
- ✅ Code has no business logic dependencies
- ✅ Code is a pure utility or primitive

**When to duplicate in each module:**

- ✅ Feature is module-specific but similar to others
- ✅ Feature needs different implementations per module
- ✅ Feature is experimental and may diverge

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Application                              │
├─────────────────────────────────────────────────────────────┤
│  Modules (Feature Modules) - modules/                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Main Module │  │Admin Module │  │Mobile Module│  ...     │
│  │             │  │             │  │             │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                  ▲                 ▲                        │
│                  │ (Consumes)      │ (Consumes)             │
├──────────────────┼─────────────────┼────────────────────────┤
│  Shared (Cross-Module Services) - shared/                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  EventCard  │  │   NavBar    │  │  use-auth   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                  ▲                 ▲                        │
│                  │ (Abstracts)     │ (Abstracts)            │
├──────────────────┴─────────────────┴────────────────────────┤
│  Core (Application Core) - core/                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ DB Client   │  │ Auth State  │  │ Global CSS  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  Contracts (Interface Layer) - contracts/                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ API Schemas │  │ Event Types │  │ Env Defs    │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│  Libraries (Generic Utils) - lib/ & components/ui/          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  EDA Bus    │  │UI Primitives│  │  Utilities  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Guidelines

### Module Development

1. **Isolation**: A module should never import from another module (`../../modules/other-module`).
2. **Communication**: Use only `shared` services and `contracts` definitions. Avoid direct core access where possible.
3. **State Management**: Each module manages its own state independently
4. **Routing**: Use core routing definitions but implement module-specific navigation

### Core Development

1. **Stability**: Core APIs should be stable and well-versioned, as changes can have wide-ranging effects.
2. **Minimality**: The core should remain as small as possible. Prefer implementing features in the `shared` layer if they are not fundamental application services.
3. **Documentation**: All core services must be well-documented
4. **Testing**: Comprehensive testing for all core services
5. **Backward Compatibility**: Maintain backward compatibility when possible.

### Shared Development

1. **Abstraction**: Services in this layer should provide clean, easy-to-use abstractions over core logic.
2. **Domain-Specific**: Code here is specific to the afisz event domain but reusable across features.
3. **Justification**: Document why a feature needs to be shared
4. **Interface Design**: Design clean, stable interfaces
5. **Migration Path**: Provide clear migration paths for breaking changes

### Library Development

1. **Domain Agnostic**: Libraries should have no business logic
2. **Reusability**: Design for maximum reusability
3. **Testing**: Extensive unit testing
4. **Documentation**: Clear API documentation

## File Structure

```
.
├── app/                       # Next.js App Router (routing only, thin wrappers over modules)
├── modules/                   # Feature Modules (Isolated Features)
│   └── main/
├── core/                      # Application Core (Low-level services)
│   ├── db/
│   └── style/
├── contracts/                 # Communication Contracts (Types, Schemas)
│   ├── api/
│   └── env/
├── shared/                    # Cross-Module Services (Consumed by Modules)
│   └── event-card/
└── lib/                       # Utility Libraries (Domain-agnostic)
    ├── eda/
    └── ui/
```

## Benefits

1. **Modularity**: Clear separation of concerns and responsibilities
2. **Scalability**: Easy to add new modules and features
3. **Team Independence**: Different teams can work on different modules
4. **Maintainability**: Isolated codebases are easier to maintain
5. **Testing**: Each component can be tested independently
6. **Deployment**: Single deployable unit with well-defined internal boundaries

## Risks and Mitigations

### Risks:

1. **Over-engineering**: Risk of creating unnecessary complexity
2. **Communication Overhead**: Coordination between teams
3. **Version Management**: Managing dependencies between components

### Mitigations:

1. **Clear Guidelines**: Well-defined architectural guidelines
2. **Documentation**: Comprehensive documentation and examples
3. **Tooling**: Automated dependency management and versioning
4. **Regular Reviews**: Regular architecture reviews and refactoring

## Future Considerations

1. **Module Extraction**: Consider extracting mature modules into independent services if needed
2. **Cross-Module Communication**: Implement an event bus defined in `contracts` for decoupled module-to-module communication.
3. **Shared State Management**: Consider a global state solution managed within the `shared` layer.
4. **Performance**: Optimize bundle splitting and lazy loading
5. **Monitoring**: Implement comprehensive monitoring and observability

## Conclusion

This modular architecture provides a solid foundation for scalable, maintainable application while preserving the simplicity and cohesion. The clear separation between modules, core, shared, contracts, and libraries ensures that the system remains flexible and extensible as it grows.
