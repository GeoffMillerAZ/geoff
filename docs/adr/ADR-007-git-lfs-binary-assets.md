# ADR-007: Git LFS for Binary Assets

## Status
Accepted

## Context
The Geoff Miller Cloud Platform includes various binary assets that present challenges for traditional Git repository management:

- **PDF Files**: Resume PDFs, project documentation, and downloadable resources
- **Design Assets**: Photoshop files (.psd), Illustrator files (.ai), Sketch files (.sketch)
- **Media Files**: Video content (.mp4, .mov, .webm), high-resolution images
- **Archive Files**: Compressed project files (.zip, .tar.gz, .dmg, .iso)

Traditional Git storage of binary files creates several problems:
- **Repository Bloat**: Binary files significantly increase repository size
- **Clone Performance**: Large repositories slow down initial clones and subsequent operations
- **Version Control Issues**: Binary diffs are inefficient and not human-readable
- **Bandwidth Consumption**: Every clone downloads full history of all binary assets
- **Collaboration Impact**: Large repositories slow down development workflows
- **CI/CD Performance**: Build systems must download large binary assets unnecessarily

Current state analysis revealed:
- Resume PDFs stored in both `public/resume/` and `src/assets/resume/`
- `.gitattributes` file exists but may not be fully optimized
- Potential for multimedia content growth as platform expands

## Decision
We will implement Git Large File Storage (LFS) for all binary assets above reasonable size thresholds. This provides efficient version control for large files while maintaining Git workflow compatibility.

**Git LFS Implementation Strategy:**

1. **File Type Coverage:**
   - **Documents**: `*.pdf` (resumes, documentation, resources)
   - **Design Files**: `*.psd`, `*.ai`, `*.sketch`, `*.fig`
   - **Media Files**: `*.mp4`, `*.mov`, `*.avi`, `*.webm`
   - **Archives**: `*.zip`, `*.tar.gz`, `*.dmg`, `*.iso`

2. **Configuration in `.gitattributes`:**
```gitattributes
# Git LFS tracking for large files
*.pdf filter=lfs diff=lfs merge=lfs -text
*.psd filter=lfs diff=lfs merge=lfs -text
*.ai filter=lfs diff=lfs merge=lfs -text
*.sketch filter=lfs diff=lfs merge=lfs -text
*.fig filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.mov filter=lfs diff=lfs merge=lfs -text
*.avi filter=lfs diff=lfs merge=lfs -text
*.webm filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.tar.gz filter=lfs diff=lfs merge=lfs -text
*.dmg filter=lfs diff=lfs merge=lfs -text
*.iso filter=lfs diff=lfs merge=lfs -text
```

3. **Asset Organization:**
```
public/
├── resume/
│   └── Geoffrey_Miller_Resume_cv20250723a.pdf (LFS)
src/assets/
├── media/
│   ├── videos/ (LFS)
│   └── high-res-images/ (LFS)
├── resources/
│   └── downloads/ (LFS)
└── design/
    └── source-files/ (LFS)
```

**Hosting and Distribution:**
- GitHub LFS for repository hosting (generous free tier)
- CDN integration for public asset delivery
- Selective downloading for development environments
- Automated deployment workflows that handle LFS assets

## Consequences

**Positive:**
- **Repository Performance**: Dramatically smaller repository size for faster clones
- **Bandwidth Efficiency**: Developers only download binary assets when needed
- **Version Control**: Proper versioning of binary assets without repository bloat
- **Scalability**: Platform can grow multimedia content without impacting Git performance
- **Developer Experience**: Faster repository operations and build processes
- **CI/CD Optimization**: Build systems can skip unnecessary binary downloads
- **Storage Cost**: More predictable and manageable storage costs

**Negative:**
- **Complexity**: Additional Git LFS commands and concepts for team members
- **Dependency**: Reliance on Git LFS service availability and performance
- **Initial Setup**: Migration effort for existing binary assets
- **Hosting Costs**: Potential costs for LFS storage beyond free tiers (though minimal for this use case)
- **Workflow Changes**: Team must understand LFS-specific commands for binary assets

**Neutral:**
- **Tool Requirements**: Team needs Git LFS installed and configured
- **Backup Strategy**: Need to ensure LFS assets are included in backup procedures

## Implementation Notes

**Migration Strategy:**

1. **Pre-migration Assessment:**
   - Audit current binary assets and sizes
   - Document which files should be migrated to LFS
   - Calculate expected repository size reduction

2. **Migration Process:**
```bash
# Install Git LFS
git lfs install

# Track existing files
git lfs track "*.pdf"
git lfs track "*.psd"
# ... other extensions

# Migrate existing files
git lfs migrate import --include="*.pdf,*.psd,*.ai" --everything

# Verify migration
git lfs ls-files
```

3. **Development Workflow:**
```bash
# Clone with LFS support
git clone <repository-url>
cd <repository>
git lfs pull

# Add new binary assets (automatically tracked)
git add new-resume.pdf
git commit -m "Add updated resume"
git push
```

**Performance Optimizations:**

1. **Selective Downloading:**
```bash
# Skip LFS files for text-only development
GIT_LFS_SKIP_SMUDGE=1 git clone <repository-url>

# Download specific LFS files when needed
git lfs pull --include="*.pdf"
```

2. **CI/CD Configuration:**
```yaml
# GitHub Actions example
- name: Checkout with LFS
  uses: actions/checkout@v4
  with:
    lfs: true
    
# Or skip LFS for builds that don't need binary assets
- name: Checkout without LFS
  uses: actions/checkout@v4
  with:
    lfs: false
```

**Monitoring and Maintenance:**

1. **Storage Monitoring:**
   - Track LFS storage usage and costs
   - Monitor repository clone and pull performance
   - Regular cleanup of old LFS objects if needed

2. **Team Education:**
   - Document LFS workflows in development guidelines
   - Provide troubleshooting guide for common LFS issues
   - Regular training on LFS best practices

**Security Considerations:**
- Ensure LFS assets follow same security and access control policies
- Consider encryption for sensitive binary assets
- Implement proper backup strategies for LFS storage
- Monitor access patterns and usage analytics

**Cost Management:**
- GitHub LFS provides 1GB storage and 1GB bandwidth free per month
- Current binary assets well within free tier limits
- Monitor usage to anticipate when paid tier might be needed
- Consider alternatives (CDN, cloud storage) if costs become significant

**Future Enhancements:**
- Automated asset optimization before LFS storage
- Integration with CDN for public asset delivery
- Backup automation for LFS assets
- Analytics on asset download patterns and usage